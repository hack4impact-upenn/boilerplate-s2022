# Load environment variables from the .env file
provider "local" {}

resource "local_file" "dotenv" {
  content  = file("${path.module}/.env")
  filename = "${path.module}/.terraform.env"
}

provider "aws" {
  region     = "us-west-1" # Set your desired region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

# S3 Bucket
resource "aws_s3_bucket" "static_website" {
  bucket = var.s3_bucket_name
}

# S3 bucket ownership controls
resource "aws_s3_bucket_ownership_controls" "static_website" {
  bucket = aws_s3_bucket.static_website.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Allow public access by disabling public access block
resource "aws_s3_bucket_public_access_block" "static_website" {
  bucket = aws_s3_bucket.static_website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket ACL to allow public read access
resource "aws_s3_bucket_acl" "static_website" {
  depends_on = [
    aws_s3_bucket_ownership_controls.static_website,
    aws_s3_bucket_public_access_block.static_website,
  ]

  bucket = aws_s3_bucket.static_website.id
  acl    = "public-read"
}

# S3 Bucket Policy to allow public access to all objects
resource "aws_s3_bucket_policy" "static_website_policy" {
  bucket = aws_s3_bucket.static_website.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.static_website.arn}/*"
      }
    ]
  })

  depends_on = [
    aws_s3_bucket_acl.static_website,
    aws_s3_bucket_website_configuration.static_website_config,
  ]
}

# S3 Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "static_website_config" {
  bucket = aws_s3_bucket.static_website.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Set Content-Type based on file extension
resource "aws_s3_object" "website_files" {
  for_each = fileset("../../client/build", "**/*")

  bucket = aws_s3_bucket.static_website.bucket
  key    = each.key
  source = "../../client/build/${each.key}"
  
  content_type = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "jpeg" = "image/jpeg",
    "gif"  = "image/gif",
    "svg"  = "image/svg+xml"
  }, split(".", each.key)[length(split(".", each.key)) - 1], "application/octet-stream")

  depends_on = [
    aws_s3_bucket_policy.static_website_policy,
  ]
}

output "s3_bucket_name" {
  value = aws_s3_bucket.static_website.bucket
}

# output "cloudfront_domain_name" {
#   value = aws_cloudfront_distribution.cdn.domain_name
# }
