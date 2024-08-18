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
