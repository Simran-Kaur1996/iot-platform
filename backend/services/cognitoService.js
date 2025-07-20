// backend/services/cognitoService.js
const {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider')

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' })

const signupUser = async (email, password) => {
  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password
  })
  return client.send(command)
}

const loginUser = async (email, password) => {
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  })
  return client.send(command)
}

module.exports = { signupUser, loginUser }
