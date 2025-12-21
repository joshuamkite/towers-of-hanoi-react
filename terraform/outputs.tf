output "account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

output "acm_certificate_id" {
  description = "ACM certificate ID"
  value       = module.frontend_website.acm_certificate_id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = module.frontend_website.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = module.frontend_website.cloudfront_domain_name
}

output "s3_bucket_id" {
  description = "S3 bucket ID (name)"
  value       = module.frontend_website.s3_bucket_id
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}
