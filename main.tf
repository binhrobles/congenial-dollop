terraform {
  backend "remote" {
    organization = "binhrobles"

    workspaces {
      name = "shitty-thirteen"
    }
  }
}

provider "aws" {
  region = var.region
}

module "client" {
  source      = "./modules/client"
  application_domain_name     = var.application_domain_name
  root_domain_name = var.root_domain_name
}

