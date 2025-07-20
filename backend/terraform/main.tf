provider "aws" {
  region = "us-east-1" # Make sure SES is supported in this region
  profile = "iot-platform"
}
