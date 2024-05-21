output "route53_nameservers" {
  value       = data.aws_route53_zone.main.name_servers
  description = "The nameservers for the Route 53 hosted zone"
}
