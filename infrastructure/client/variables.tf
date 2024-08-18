variable "s3_bucket_name" {
  default     = "hackboilerplate-frontend"
  type        = string
  description = "Name of the S3 bucket"
}

# Load environment variables
variable "aws_access_key_id" {
  description = "AWS Access Key ID"
  type        = string
  default     = ""
}

variable "aws_secret_access_key" {
  description = "AWS Secret Access Key"
  type        = string
  default     = ""
}

locals {
  aws_access_key_id     = var.aws_access_key_id != "" ? var.aws_access_key_id : local_file.dotenv.content
  aws_secret_access_key = var.aws_secret_access_key != "" ? var.aws_secret_access_key : local_file.dotenv.content
}