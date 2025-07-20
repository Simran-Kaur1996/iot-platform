variable "aws_region" {
  default = "us-east-1"
}

variable "ses_verified_email" {
  description = "Email address you manually verify in SES"
  type        = string
}

variable "alert_email" {
  description = "Email to receive SNS alerts"
  type        = string
}


variable "backend_repo" {
  default = "iot-backend"
}

variable "frontend_repo" {
  default = "iot-frontend"
}

