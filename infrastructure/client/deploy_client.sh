#!/bin/bash
ENV_FILE="../.env"
#!/bin/bash
ENV_FILE="../.env"

# Load the .env file
set -o allexport
source $ENV_FILE
set +o allexport

# Build the client
cd ../../client && yarn build

# Deploy the client
cd ../infrastructure/client
terraform init && terraform validate && terraform plan -out=tfplan -input=false && terraform apply -input=false tfplan