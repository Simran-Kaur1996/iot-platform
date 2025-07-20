resource "aws_sns_topic" "iot_alerts" {
  name = "iot-sensor-alerts"
}

resource "aws_sns_topic_subscription" "email_subscriber" {
  topic_arn = aws_sns_topic.iot_alerts.arn
  protocol  = "email"
  endpoint  =  var.alert_email
}
