terraform init
terraform plan -out=tfplan -input=false
terraform apply -input=false tfplan