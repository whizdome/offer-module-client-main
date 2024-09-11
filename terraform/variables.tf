variable "aws_public_subnet" {
  description = "List of public subnet IDs where EKS nodes will be deployed"
  type        = list(string)
}

variable "vpc_id" {
  description = "The VPC ID where the EKS cluster and node group will be launched"
  type        = string
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "tripplescale-cluster" # Replace or override with tfvars
}

variable "endpoint_private_access" {
  description = "Enable private access to the EKS cluster"
  type        = bool
  default     = false
}

variable "endpoint_public_access" {
  description = "Enable public access to the EKS cluster"
  type        = bool
  default     = true
}

variable "public_access_cidrs" {
  description = "List of CIDR blocks that can access the EKS public endpoint"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Open to the public. Adjust for security.
}

variable "node_group_name" {
  description = "The name of the EKS node group"
  type        = string
  default     = "eks-node-group"
}

variable "scaling_desired_size" {
  description = "Desired number of instances in the EKS node group"
  type        = number
  default     = 2
}

variable "scaling_max_size" {
  description = "Maximum number of instances in the EKS node group"
  type        = number
  default     = 3
}

variable "scaling_min_size" {
  description = "Minimum number of instances in the EKS node group"
  type        = number
  default     = 1
}

variable "instance_types" {
  description = "Instance types for the EKS node group"
  type        = list(string)
  default     = ["t3.medium"] # You can adjust this based on your workload.
}
