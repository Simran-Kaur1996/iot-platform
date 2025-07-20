resource "aws_ecr_repository" "backend" {
  name = "iot-backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "iot-frontend"
}