output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.iot_user_pool.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.iot_user_client.id
}

output "sns_topic_arn" {
  value = aws_sns_topic.iot_alerts.arn
}

output "ses_verified_email" {
  value = aws_ses_email_identity.iot_sender.email
}

output "beanstalk_app_url" {
  value = aws_elastic_beanstalk_environment.iot_env.endpoint_url
}