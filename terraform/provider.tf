terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  required_version = ">= 0.14"
}

provider "aws" {
  region = var.region
}

variable "region" {
  description = "AWS region where resources will be deployed"
  type        = string
  default     = "eu-west-2"
}
