terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

///
// Local variables
///
locals {
  client_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:client"
  server_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:server"
}


///
// Provider
///
provider "aws" {
  region = var.region
}

///
// Load balancer
///
# resource "aws_lb" "nlb" {
#   name                             = "my-nlb"
#   load_balancer_type               = "network"
#   subnets                          = data.aws_subnets.default.ids
#   enable_cross_zone_load_balancing = true
#   internal                         = false // Set to false for internet-facing
# }

# resource "aws_eip" "nlb_ip" {
#   vpc = true
# }

# resource "aws_lb_target_group" "nlb_tg" {
#   name        = "my-nlb-tg"
#   port        = 80
#   protocol    = "TCP"
#   vpc_id      = data.aws_vpc.default.id
#   target_type = "ip"
# }

# resource "aws_lb_listener" "listener" {
#   load_balancer_arn = aws_lb.nlb.arn
#   port              = 80
#   protocol          = "TCP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.nlb_tg.arn
#   }
# }


///
// ECS resources, tasks, and cloudwatch
///
resource "aws_ecs_cluster" "cluster" {
  name = var.cluster_name

  # This uses up extra resources, but can set up logging
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_cloudwatch_log_group" "ecs_app_family_log_group" {
  name = "/ecs/app-family"
  // Optionally you can set retention in days, the default is to keep logs forever
  // retention_in_days = 90
}

resource "aws_ecs_task_definition" "app" {
  family                   = "app-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "2048"
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = local.client_image_tag
      cpu       = 256
      memory    = 1024
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ],
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/app-family"
          awslogs-region        = var.region
          awslogs-stream-prefix = "frontend"
        }
      }
    },
    {
      name      = "backend"
      image     = local.server_image_tag
      cpu       = 256
      memory    = 1024
      essential = true
      portMappings = [
        {
          containerPort = 4000
          hostPort      = 4000
          protocol      = "tcp"
        }
      ],
      environment = [
        { "name" : "ATLAS_URI", "value" : var.atlas_uri },
        { "name" : "COOKIE_SECRET", "value" : "any-string" },
        { "name" : "SENDGRID_API_KEY", "value" : "SG.sendgrid-api-key-from-above" },
        { "name" : "SENDGRID_EMAIL_ADDRESS", "value" : "sendgrid-sender-identity-email-from-above" }
      ],
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/app-family"
          awslogs-region        = var.region
          awslogs-stream-prefix = "backend"
        }
      }
    }
  ])
}

///
// VPC configuration
///
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

///
// ECS service and discovery
///



resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1 # Example count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
  }

  # load_balancer {
  #   target_group_arn = aws_lb_target_group.nlb_tg.arn
  #   container_name   = "frontend"
  #   container_port   = 3000
  # }

  # depends_on = [aws_lb_listener.listener]
}

///
// ECS IAM roles
///
# Declare based on existing roles
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
}

data "aws_iam_policy" "cloudwatch_logs_policy" {
  arn = "arn:aws:iam::${var.aws_account_id}:policy/ECSLogsPolicy"
}

# Attach policies to roles
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = data.aws_iam_policy.cloudwatch_logs_policy.arn
}

