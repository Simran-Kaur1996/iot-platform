// services/snsService.js
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const sns = new AWS.SNS()

/**
 * Send SMS alert via SNS topic
 * @param {string} message - SMS text body
 */
async function sendSMSAlert(message) {
  const params = {
    Message: message,
    TopicArn: process.env.SNS_TOPIC_ARN
  }

  return sns.publish(params).promise()
}

module.exports = { sendSMSAlert }
