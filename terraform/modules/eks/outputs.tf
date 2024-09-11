output "endpoint" {
  value = aws_eks_cluster.tripplescale.endpoint
}

output "kubeconfig-certificate-authority-data" {
  value = aws_eks_cluster.tripplescale.certificate_authority[0].data
}
output "cluster_id" {
  value = aws_eks_cluster.tripplescale.id
}
output "cluster_endpoint" {
  value = aws_eks_cluster.tripplescale.endpoint
}
output "cluster_name" {
  value = aws_eks_cluster.tripplescale.name
}
