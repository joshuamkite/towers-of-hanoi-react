variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "eu-west-2"
}

variable "backend_bucket" {
  description = "S3 bucket for Terraform state"
  type        = string
}

variable "backend_key" {
  description = "S3 key for Terraform state file"
  type        = string
}

variable "backend_region" {
  description = "AWS region for Terraform state bucket"
  type        = string
}

variable "default_tags" {
  description = "Default tags to apply to all resources"
  type        = map(string)
  default = {
    Project   = "towers-of-hanoi"
    ManagedBy = "opentofu"
  }
}

variable "domain_name" {
  description = "Domain name for the Towers of Hanoi website"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "hosted_zone_name" {
  description = "Route53 hosted zone name"
  type        = string
}

variable "parent_zone_name" {
  description = "Parent hosted zone name (for subdomains). If not set, uses domain_name"
  type        = string
  default     = ""
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "hanoi"
}
