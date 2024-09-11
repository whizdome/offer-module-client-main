terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.15.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.1.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.1"
    }
  }

# Data source to get EKS cluster information
data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

# Data source to get EKS cluster authentication details
data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

# Kubernetes provider configuration using EKS cluster details
provider "kubernetes" {
  cluster_ca_certificate = base64decode(module.eks.kubeconfig-certificate-authority-data)
  host                   = data.aws_eks_cluster.cluster.endpoint
  token                  = data.aws_eks_cluster_auth.cluster.token
}

# AWS provider configuration for eu-west-2 (London region)
provider "aws" {
  region = "eu-west-2"
}
