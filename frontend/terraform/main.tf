provider "aws" {
  region = "us-east-1"  
}

resource "aws_instance" "realapi" {
  ami           = "ami-084568db4383264d4"  # Latest Ubuntu AMI (check AWS for latest)
  instance_type = "t2.micro"  # Free tier instance
  key_name      = "akila"  # Your SSH key name in AWS

  security_groups = [aws_security_group.realapi_sg.name]

  tags = {
    Name = "RealAPI-Instance"
  }
}

resource "aws_security_group" "realapi_sg" {
  name        = "realapi-security-group"
  description = "Allow SSH & API traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # SSH access (Restrict to your IP for security)
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow API access
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow API access
  }

  # ✅ Added Rule for Frontend (Port 5174)
  ingress {
    from_port   = 5174
    to_port     = 5174
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow Frontend Access
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
