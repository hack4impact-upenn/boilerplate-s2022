#!/bin/bash
ENV_FILE="../.env"
#!/bin/bash
ENV_FILE="../.env"

# Load the .env file
set -o allexport
source $ENV_FILE
set +o allexport

# Deploy the backend
terraform init && terraform validate && terraform plan -out=tfplan -input=false && terraform apply -input=false tfplan