resource "aws_elastic_beanstalk_application" "iot_app" {
  name        = "iot-platform-app"
  description = "IoT Monitoring Platform"
}

resource "aws_elastic_beanstalk_application_version" "iot_app_version" {
  name        = "v1"
  application = aws_elastic_beanstalk_application.iot_app.name
  description = "Version 1"
  bucket      = "iot-platform-deployments"
  key         = "iot-platform-deploy.zip"

  depends_on = [aws_elastic_beanstalk_application.iot_app]
}

resource "aws_elastic_beanstalk_environment" "iot_env" {
  name                = "iot-platform-env"
  application         = aws_elastic_beanstalk_application.iot_app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.4.16 running ECS"
  version_label       = aws_elastic_beanstalk_application_version.iot_app_version.name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.micro"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }
}
