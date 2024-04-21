variable "github_repo_owner" {
  default = "hack4impact-upenn"
  type    = string
}

variable "github_repo_name" {
  default = "boilerplate-s2022"
  type    = string
}

variable "region" {
  default     = "us-east-2"
  type        = string
  description = "Launch region for the ECS cluster"
}

variable "cluster_name" {
  default     = "app-cluster"
  type        = string
  description = "Name of the ECS cluster"
}

