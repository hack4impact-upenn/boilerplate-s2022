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
# resource "aws_cloudwatch_log_group" "ecs_app_family_log_group" {
#   name = "/ecs/app-family"
#   // retention_in_days = 90
# }

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
        { "name" : "FRONTEND_URL", "value" : var.frontend_url },
        { "name" : "ATLAS_URI", "value" : var.atlas_uri },
        { "name" : "COOKIE_SECRET", "value" : var.cookie_secret },
        { "name" : "SENDGRID_API_KEY", "value" : var.sendgrid_api_key },
        { "name" : "SENDGRID_EMAIL_ADDRESS", "value" : var.sendgrid_email_address },
        { "name" : "MIXPANEL_TOKEN", "value" : var.mixpanel_token },
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

/* VPC CONFIGURATION */
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    # TODO: set a variable to name this
    Name = "hack-main-vpc"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]

  tags = {
    # TODO: set a variable to name these
    Name = "Public Hack Project Subnet ${count.index + 1}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "alb_sg" {
  # TODO: set a better name for this (e.g. based on a variable name)
  name        = "alb-sg"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "alb-sg"
  }
}

resource "aws_security_group" "ecs_sg" {
  # TODO: set a better name for this (e.g. based on a variable)
  name        = "hack-project-ecs-sg"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Allow traffic from ALB"
    from_port       = 4000
    to_port         = 4000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ecs-sg"
  }
}


/* Load balancer configuration */
resource "aws_lb" "app" {
  name               = "${var.cluster_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "${var.cluster_name}-backend-tg"
  port        = 4000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
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

# resource "aws_lb_listener" "app_listener_secure" {
#   load_balancer_arn = aws_lb.app.arn
#   port              = "443"
#   protocol          = "HTTPS"

#   default_action {
#     type = "fixed-response"
#     fixed_response {
#       content_type = "text/plain"
#       message_body = "Not Found"
#       status_code  = "404"
#     }
#   }
# }

# resource "aws_lb_listener_rule" "backend_secure" {
#   listener_arn = aws_lb_listener.app_listener_secure.arn
#   priority     = 200

#   action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.backend_tg.arn
#   }

#   condition {
#     path_pattern {
#       values = ["/api/*"]
#     }
#   }
# }

// ECS service
resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "backend"
    container_port   = 4000
  }
}

/* ECS task execution role */
# resource "aws_iam_role" "ecs_task_execution_role" {
#   name = "ecs_task_execution_role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Action = "sts:AssumeRole",
#         Effect = "Allow",
#         Principal = {
#           Service = "ecs-tasks.amazonaws.com"
#         }
#       }
#     ]
#   })
# }

# TODO: since the role/policy do not get deleted, these need to get created separately at some point
#       so they can be referenced here as `data` resources. we should decide where we actually do
#       create them
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
}

data "aws_iam_policy" "cloudwatch_logs_policy" {
  arn = "arn:aws:iam::${var.aws_account_id}:policy/ECSLogsPolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# resource "aws_iam_policy" "cloudwatch_logs_policy" {
#   name        = "ECSLogsPolicy"
#   description = "Allow ECS Task Execution Role to push logs to CloudWatch"

#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Action = [
#           "logs:CreateLogStream",
#           "logs:CreateLogGroup"
#         ],
#         Resource = "arn:aws:logs:*:*:*"
#       },
#       {
#         Effect = "Allow",
#         Action = [
#           "logs:PutLogEvents"
#         ],
#         Resource = [
#           "arn:aws:logs:*:*:log-group:/ecs/*:log-stream:*",
#           "arn:aws:logs:*:*:log-group:/ecs/*"
#         ]
#       }
#     ]
#   })
# }

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = data.aws_iam_policy.cloudwatch_logs_policy.arn
}

