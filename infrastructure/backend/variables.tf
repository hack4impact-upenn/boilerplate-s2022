variable "github_repo_owner" {
  default     = "hack4impact-upenn"
  type        = string
  description = "Name of the GH repo owner, used the pull the docker images"
}

variable "github_repo_name" {
  default     = "boilerplate-s2022"
  type        = string
  description = "Name of the GH repo, used to pull the docker images"
}

variable "region" {
  default     = "us-east-1"
  type        = string
  description = "Launch region for the ECS cluster"
}

variable "cluster_name" {
  default     = "app-cluster"
  type        = string
  description = "Name of the ECS cluster"
}

///
// ENV VARIABLES
// These are set in .auto.tfvars
///
variable "aws_account_id" {
  type = string
}

variable "atlas_uri" {
  type = string
}

variable "cookie_secret" {
  type = string
}

variable "sendgrid_api_key" {
  type = string
}

variable "sendgrid_email_address" {
  type = string
}

variable "frontend_url" {
  type = string
}

variable "mixpanel_token" {
  type = string
}
