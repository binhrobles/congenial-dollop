terraform {
  backend "remote" {
    organization = "binhrobles"

    workspaces {
      name = "shitty-thirteen"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.region
}

provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

module "client" {
  source = "../modules/client"
  providers = {
    aws          = aws
    aws.virginia = aws.virginia
  }
  application_domain_name = var.application_domain_name
  root_domain_name        = var.root_domain_name
}
