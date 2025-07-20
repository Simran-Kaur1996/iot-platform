resource "aws_ses_email_identity" "iot_sender" {
  email = "${var.ses_verified_email}"
}
