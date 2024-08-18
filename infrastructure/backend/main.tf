terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

locals {
  server_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:server"
}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster_name
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# TODO: this only needs to be created once; should we keep it in here or create
# it manually?
resource "aws_cloudwatch_log_group" "ecs_app_family_log_group" {
  name = "/ecs/app-family"
  // retention_in_days = 90
}

resource "aws_ecs_task_definition" "app" {
  family                   = "app-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "1024"
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
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
        // TODO: we may end up needing to have two env vars here, one for the
        // alb url (for cors), and one for the redirect (the actual domain name)
        // - Right now we're just using `FRONTEND_URL` in the same places in
        //   the backend
        { "name" : "FRONTEND_URL", "value" : "https://hackboilerplate.com" },
        { "name" : "ATLAS_URI", "value" : var.atlas_uri },
        { "name" : "COOKIE_SECRET", "value" : var.cookie_secret },
        { "name" : "SENDGRID_API_KEY", "value" : var.sendgrid_api_key },
        { "name" : "SENDGRID_EMAIL_ADDRESS", "value" : var.sendgrid_email_address }
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

// VPC configuration
// TODO: decide if we should use a different VPC
data "aws_vpc" "default" {
  default = true
}

data "aws_security_group" "default" {
  vpc_id = data.aws_vpc.default.id
  name   = "default"
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

// Load balancer configuration
resource "aws_lb" "app" {
  name               = "${var.cluster_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [data.aws_security_group.default.id]
  subnets            = data.aws_subnets.default.ids

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "${var.cluster_name}-backend-tg"
  port        = 4000
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    path                = "/" # TODO: add a health check endpoint
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 60
    interval            = 300
    matcher             = "200"
  }
}

resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "backend" {
  listener_arn = aws_lb_listener.app_listener.arn
  priority     = 200

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}

// ECS service
resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "backend"
    container_port   = 4000
  }
}


# Get existing IAM info
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action    = "sts:AssumeRole",
        Effect    = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_policy" "cloudwatch_logs_policy" {
  name        = "ECSLogsPolicy"
  description = "Allow ECS Task Execution Role to push logs to CloudWatch"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogStream",
          "logs:CreateLogGroup"
        ],
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow",
        Action = [
          "logs:PutLogEvents"
        ],
        Resource = [
          "arn:aws:logs:*:*:log-group:/ecs/*:log-stream:*",
          "arn:aws:logs:*:*:log-group:/ecs/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}


data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
  depends_on = [aws_iam_role.ecs_task_execution_role]
}

data "aws_iam_policy" "cloudwatch_logs_policy" {
  arn = "arn:aws:iam::${var.aws_account_id}:policy/ECSLogsPolicy"
  depends_on = [aws_iam_policy.cloudwatch_logs_policy]
}
