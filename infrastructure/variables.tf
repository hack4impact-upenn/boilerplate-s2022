variable "client_image_tag" {
  default     = "your_frontend_image_repository:tag"
  type        = string
  description = "Name of the repository and tag for the client (frontend) image"
}

variable "server_image_tag" {
  default     = "your_server_image_repository:tag"
  type        = string
  description = "Name of the repository and tag for the server (backend) image"
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
