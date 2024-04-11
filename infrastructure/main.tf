terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

locals {
  client_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:client"
  server_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:server"
}


provider "aws" {
  region = var.region
}

data "aws_secretsmanager_secret" "github_pat" {
  name = "github-pat"
}

data "aws_secretsmanager_secret_version" "current_github_pat" {
  secret_id = data.aws_secretsmanager_secret.github_pat.id
}

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
  cpu                      = "512"  # Adjust based on your needs
  memory                   = "2048" # Adjust based on your needs
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

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
        { "name" : "ATLAS_URI", "value" : "<fill in>" },
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

resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1 # Example count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["fill in", "fill in"]
    assign_public_ip = true
  }
}

# So that the ECS role can execute tasks
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
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



# Attach the policies to the role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}
