output "route53_nameservers" {
  value       = aws_route53_zone.main.name_servers
  description = "The nameservers for the Route 53 hosted zone"
}

output "certificate_tags" {
  value = aws_acm_certificate.cert.tags_all
}
