// services/sesService.js
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const ses = new AWS.SES()

/**
 * Send email via SES with HTML card content.
 * @param {string} subject - Email subject
 * @param {string} htmlCard - HTML content
 * @param {string} recipient - Destination email
 */
async function sendEmailAlert(
  subject,
  htmlCard,
  recipient = process.env.SES_VERIFIED_EMAIL
) {
  const params = {
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlCard
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: process.env.SES_VERIFIED_EMAIL
  }

  return ses.sendEmail(params).promise()
}

module.exports = { sendEmailAlert }
