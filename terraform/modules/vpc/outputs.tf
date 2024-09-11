output "aws_public_subnet" {
  value = aws_subnet.public_tripplescale_subnet.*.id
}

output "vpc_id" {
  value = aws_vpc.tripplescale.id
}
