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
  client_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:client"
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
      environment = [
        { "name" : "REACT_APP_BACKEND_URL", "value" : "http://${aws_lb.app.dns_name}/api" },
        { "name" : "TEST_ENV", "value" : "12345" },
      ],
      // TODO: add env vars
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
        // TODO: we may end up needing to have two env vars here, one for the
        // alb url (for cors), and one for the redirect (the actual domain name)
        // - Right now we're just using `FRONTEND_URL` in the same places in
        //   the backend
        { "name" : "FRONTEND_URL", "value" : "http://${aws_lb.app.dns_name}/" },
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

resource "aws_acm_certificate" "cert" {
  domain_name       = "hackboilerplate.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
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

resource "aws_lb_target_group" "frontend_tg" {
  name        = "${var.cluster_name}-frontend-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 60
    interval            = 300
    matcher             = "200,301,302"
  }
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

# resource "aws_lb_listener" "app_listener_https" {
#   load_balancer_arn = aws_lb.app.arn
#   port              = "443"
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-2016-08"
#   certificate_arn   = aws_acm_certificate.cert.arn

#   default_action {
#     type = "fixed-response"
#     fixed_response {
#       content_type = "text/plain"
#       message_body = "Not Found"
#       status_code  = "404"
#     }
#   }
# }


resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app.arn
  port              = "80"
  protocol          = "HTTP"

  # default_action {
  #   type = "redirect"
  #   redirect {
  #     port        = "443"
  #     protocol    = "HTTPS"
  #     status_code = "HTTP_301"
  #   }
  # }

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "frontend" {
  listener_arn = aws_lb_listener.app_listener.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_tg.arn
  }

  condition {
    host_header {
      values = ["hackboilerplate.com"]
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

# resource "aws_lb_listener_rule" "frontend_https" {
#   listener_arn = aws_lb_listener.app_listener_https.arn
#   priority     = 100

#   action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.frontend_tg.arn
#   }

#   condition {
#     host_header {
#       values = ["hackboilerplate.com"]
#     }
#   }
# }

# resource "aws_lb_listener_rule" "backend_https" {
#   listener_arn = aws_lb_listener.app_listener_https.arn
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
    subnets          = data.aws_subnets.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name   = "frontend"
    container_port   = 3000
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "backend"
    container_port   = 4000
  }
}


# Get existing IAM info
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
}

data "aws_iam_policy" "cloudwatch_logs_policy" {
  arn = "arn:aws:iam::${var.aws_account_id}:policy/ECSLogsPolicy"
}

# Attach the policies to the role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = data.aws_iam_policy.cloudwatch_logs_policy.arn
}

// ALB IP routing
resource "aws_route53_zone" "main" {
  name = var.hosted_zone_name
}

# resource "aws_route53_record" "backend" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = "api.${var.hosted_zone_name}"
#   type    = "A"
#   ttl     = "300"
#   records = [aws_eip.nlb_eip_1.public_ip, aws_eip.nlb_eip_2.public_ip]
# }

resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "hackboilerplate.com"
  type    = "A"

  alias {
    name                   = aws_lb.app.dns_name
    zone_id                = aws_lb.app.zone_id
    evaluate_target_health = true
  }
}

# So that the ECS role can execute tasks
# For CREATING a role
# resource "aws_iam_role" "ecs_task_execution_role" {
#   name = "ecs_task_execution_role"
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "ecs-tasks.amazonaws.com"
#         }
#       },
#     ]
#   })
# }
# For CREATING a policy
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




# terraform {
#   required_providers {
#     aws = {
#       source  = "hashicorp/aws"
#       version = "~> 4.16"
#     }
#   }

#   required_version = ">= 1.2.0"
# }

# ///
# // Local variables
# ///
# locals {
#   client_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:client"
#   server_image_tag = "ghcr.io/${var.github_repo_owner}/${var.github_repo_name}:server"
# }


# ///
# // Provider
# ///
# provider "aws" {
#   region = var.region
# }

# ///
# // Load balancer
# ///
# # resource "aws_lb" "nlb" {
# #   name                             = "my-nlb"
# #   load_balancer_type               = "network"
# #   subnets                          = data.aws_subnets.default.ids
# #   enable_cross_zone_load_balancing = true
# #   internal                         = false // Set to false for internet-facing
# # }

# # resource "aws_eip" "nlb_ip" {
# #   vpc = true
# # }

# # resource "aws_lb_target_group" "nlb_tg" {
# #   name        = "my-nlb-tg"
# #   port        = 80
# #   protocol    = "TCP"
# #   vpc_id      = data.aws_vpc.default.id
# #   target_type = "ip"
# # }

# # resource "aws_lb_listener" "listener" {
# #   load_balancer_arn = aws_lb.nlb.arn
# #   port              = 80
# #   protocol          = "TCP"

# #   default_action {
# #     type             = "forward"
# #     target_group_arn = aws_lb_target_group.nlb_tg.arn
# #   }
# # }


# ///
# // ECS resources, tasks, and cloudwatch
# ///
# resource "aws_ecs_cluster" "cluster" {
#   name = var.cluster_name

#   # This uses up extra resources, but can set up logging
#   setting {
#     name  = "containerInsights"
#     value = "enabled"
#   }
# }

# resource "aws_cloudwatch_log_group" "ecs_app_family_log_group" {
#   name = "/ecs/app-family"
#   // Optionally you can set retention in days, the default is to keep logs forever
#   // retention_in_days = 90
# }

# resource "aws_ecs_task_definition" "app" {
#   family                   = "app-family"
#   network_mode             = "awsvpc"
#   requires_compatibilities = ["FARGATE"]
#   cpu                      = "512"
#   memory                   = "2048"
#   execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn

#   container_definitions = jsonencode([
#     {
#       name      = "frontend"
#       image     = local.client_image_tag
#       cpu       = 256
#       memory    = 1024
#       essential = true
#       portMappings = [
#         {
#           containerPort = 3000
#           hostPort      = 3000
#           protocol      = "tcp"
#         }
#       ],
#       logConfiguration = {
#         logDriver = "awslogs"
#         options = {
#           awslogs-group         = "/ecs/app-family"
#           awslogs-region        = var.region
#           awslogs-stream-prefix = "frontend"
#         }
#       }
#     },
#     {
#       name      = "backend"
#       image     = local.server_image_tag
#       cpu       = 256
#       memory    = 1024
#       essential = true
#       portMappings = [
#         {
#           containerPort = 4000
#           hostPort      = 4000
#           protocol      = "tcp"
#         }
#       ],
#       environment = [
#         { "name" : "ATLAS_URI", "value" : var.atlas_uri },
#         { "name" : "COOKIE_SECRET", "value" : "any-string" },
#         { "name" : "SENDGRID_API_KEY", "value" : "SG.sendgrid-api-key-from-above" },
#         { "name" : "SENDGRID_EMAIL_ADDRESS", "value" : "sendgrid-sender-identity-email-from-above" }
#       ],
#       logConfiguration = {
#         logDriver = "awslogs"
#         options = {
#           awslogs-group         = "/ecs/app-family"
#           awslogs-region        = var.region
#           awslogs-stream-prefix = "backend"
#         }
#       }
#     }
#   ])
# }

# ///
# // VPC configuration
# ///
# data "aws_vpc" "default" {
#   default = true
# }

# data "aws_subnets" "default" {
#   filter {
#     name   = "vpc-id"
#     values = [data.aws_vpc.default.id]
#   }
# }

# ///
# // ECS service and discovery
# ///



# resource "aws_ecs_service" "app_service" {
#   name            = "app-service"
#   cluster         = aws_ecs_cluster.cluster.id
#   task_definition = aws_ecs_task_definition.app.arn
#   desired_count   = 1 # Example count
#   launch_type     = "FARGATE"

#   network_configuration {
#     subnets          = data.aws_subnets.default.ids
#     assign_public_ip = true
#   }

#   # load_balancer {
#   #   target_group_arn = aws_lb_target_group.nlb_tg.arn
#   #   container_name   = "frontend"
#   #   container_port   = 3000
#   # }

#   # depends_on = [aws_lb_listener.listener]
# }

# ///
# // ECS IAM roles
# ///
# # Declare based on existing roles
# data "aws_iam_role" "ecs_task_execution_role" {
#   name = "ecs_task_execution_role"
# }

# data "aws_iam_policy" "cloudwatch_logs_policy" {
#   arn = "arn:aws:iam::${var.aws_account_id}:policy/ECSLogsPolicy"
# }

# # Attach policies to roles
# resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
#   role       = data.aws_iam_role.ecs_task_execution_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }

# resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
#   role       = data.aws_iam_role.ecs_task_execution_role.name
#   policy_arn = data.aws_iam_policy.cloudwatch_logs_policy.arn
# }

