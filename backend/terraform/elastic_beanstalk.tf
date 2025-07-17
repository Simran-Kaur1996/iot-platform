# resource "aws_elastic_beanstalk_application" "iot_backend_app" {
#   name        = "iot-backend-app"
#   description = "Elastic Beanstalk app for IoT backend"
# }

# resource "aws_elastic_beanstalk_environment" "iot_env" {
#   name                = "iot-backend-env"
#   application         = aws_elastic_beanstalk_application.iot_backend_app.name
#   solution_stack_name = "64bit Amazon Linux 2 v5.8.4 running Docker"

#   setting {
#     namespace = "aws:elasticbeanstalk:application:environment"
#     name      = "NODE_ENV"
#     value     = "production"
#   }
