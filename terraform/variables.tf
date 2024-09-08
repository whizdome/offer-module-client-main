variable "region" {
  description = "AWS region where resources will be deployed"
  type        = string
  default     = "eu-west-2"
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
  default     = "tripplescale_cluster"
}

variable "node_group_name" {
  description = "The name of the EKS node group"
  type        = string
  default     = "default-node-group"
}

variable "desired_size" {
  description = "The desired size of the node group"
  type        = number
  default     = 2
  validation {
    condition     = var.desired_size >= 1
    error_message = "The desired size must be at least 1."
  }
}

variable "max_size" {
  description = "The maximum size of the node group"
  type        = number
  default     = 5
  validation {
    condition     = var.max_size >= var.desired_size
    error_message = "The maximum size must be greater than or equal to the desired size."
  }
}

variable "min_size" {
  description = "The minimum size of the node group"
  type        = number
  default     = 1
  validation {
    condition     = var.min_size >= 1
    error_message = "The minimum size must be at least 1."
  }
}

variable "subnet_cidrs" {
  description = "List of CIDR blocks for the subnets"
  type        = list(string)
  default = [
    "10.0.1.0/24",
    "10.0.2.0/24",
    "10.0.3.0/24"
  ]
}
