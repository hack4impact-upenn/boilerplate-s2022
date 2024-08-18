ENV_FILE="../../client/.env"
ALB_DNS=$(terraform output -raw alb_dns_name)
echo "REACT_APP_BACKEND_URL=http://$ALB_DNS" > $ENV_FILE