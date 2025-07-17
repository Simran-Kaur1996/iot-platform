const express = require('express')
const router = express.Router()
const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider')

// ✅ Pull region and client ID from environment
const REGION = 'us-east-1' // Or extract from user pool ID prefix
const CLIENT_ID = process.env.COGNITO_CLIENT_ID

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION })

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  })

  try {
    const response = await cognitoClient.send(command)
    const token = response.AuthenticationResult?.IdToken
    if (!token) throw new Error('No token returned from Cognito')

    return res.status(200).json({ token })
  } catch (error) {
    console.error('Login failed:', error)
    return res
      .status(401)
      .json({ error: 'Login failed', message: error.message })
  }
})

module.exports = router
