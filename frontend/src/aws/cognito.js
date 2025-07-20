import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID // Replace with your App Client ID
}

const userPool = new CognitoUserPool(poolData)

export const signUpUser = (email, password) =>
  new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      [{ Name: 'email', Value: email }],
      null,
      (err, result) => {
        if (err) return reject(err)
        resolve(result.user)
      }
    )
  })

export const loginUser = (email, password) =>
  new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken()
        resolve(accessToken)
      },
      onFailure: reject
    })
  })
