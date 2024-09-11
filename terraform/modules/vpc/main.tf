resource "aws_vpc" "tripplescale" {
  cidr_block       = var.vpc_cidr
  instance_tenancy = var.instance_tenancy
  tags = {
    Name = var.tags
  }
}

resource "aws_internet_gateway" "tripplescale_gw" {
  vpc_id = aws_vpc.tripplescale.id

  tags = {
    Name = var.tags
  }
}

data "aws_availability_zones" "available" {
}


resource "random_shuffle" "az_list" {
  input        = data.aws_availability_zones.available.names
  result_count = 2
}

resource "aws_subnet" "public_tripplescale_subnet" {
  count                   = var.public_sn_count
  vpc_id                  = aws_vpc.tripplescale.id
  cidr_block              = var.public_cidrs[count.index]
  availability_zone       = random_shuffle.az_list.result[count.index]
  map_public_ip_on_launch = var.map_public_ip_on_launch
  tags = {
    Name = var.tags
  }
}


resource "aws_default_route_table" "internal_tripplescale_default" {
  default_route_table_id = aws_vpc.tripplescale.default_route_table_id

  route {
    cidr_block = var.rt_route_cidr_block
    gateway_id = aws_internet_gateway.tripplescale_gw.id
  }
  tags = {
    Name = var.tags
  }
}

resource "aws_route_table_association" "default" {
  count          = var.public_sn_count
  subnet_id      = aws_subnet.public_tripplescale_subnet[count.index].id
  route_table_id = aws_default_route_table.internal_tripplescale_default.id
}
