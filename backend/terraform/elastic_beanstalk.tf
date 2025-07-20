# # Elastic Beanstalk Application
# resource "aws_elastic_beanstalk_application" "iot_app" {
#   name        = "iot-platform-app"
#   description = "Elastic Beanstalk app for IoT Platform"
# }

# # Backend Environment
# resource "aws_elastic_beanstalk_environment" "backend_env" {
#   name                = "iot-backend-env"
#   application         = aws_elastic_beanstalk_application.iot_app.name
#   solution_stack_name = "64bit Amazon Linux 2 v3.5.2 running Docker"

#   setting {
#     namespace = "aws:elasticbeanstalk:container:docker"
#     name      = "Image"
#     value     = "${aws_ecr_repository.backend.repository_url}:latest"
#   }

#   setting {
#     namespace = "aws:elasticbeanstalk:environment"
#     name      = "EnvironmentType"
#     value     = "LoadBalanced" # or "SingleInstance" if not using ELB
#   }

#   setting {
#     namespace = "aws:autoscaling:launchconfiguration"
#     name      = "InstanceType"
#     value     = "t3.micro"
#   }
# }

# # Frontend Environment
# resource "aws_elastic_beanstalk_environment" "frontend_env" {
#   name                = "iot-frontend-env"
#   application         = aws_elastic_beanstalk_application.iot_app.name
#   solution_stack_name = "64bit Amazon Linux 2 v3.5.2 running Docker"

#   setting {
#     namespace = "aws:elasticbeanstalk:container:docker"
#     name      = "Image"
#     value     = "${aws_ecr_repository.frontend.repository_url}:latest"
#   }

#   setting {
#     namespace = "aws:elasticbeanstalk:environment"
#     name      = "EnvironmentType"
#     value     = "LoadBalanced"
#   }

#   setting {
#     namespace = "aws:autoscaling:launchconfiguration"
#     name      = "InstanceType"
#     value     = "t3.micro"
#   }
# }
