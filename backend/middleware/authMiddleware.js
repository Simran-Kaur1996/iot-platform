const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const axios = require('axios')

const region = process.env.COGNITO_REGION
const userPoolId = process.env.COGNITO_USER_POOL_ID
const jwksUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`

let pems

const fetchPems = async () => {
  const { data } = await axios.get(jwksUrl)
  pems = {}
  data.keys.forEach((key) => {
    pems[key.kid] = jwkToPem(key)
  })
}

const verifyToken = async (req, res, next) => {
  if (!pems) await fetchPems()

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing or invalid token' })

  const token = authHeader.split(' ')[1]
  const decoded = jwt.decode(token, { complete: true })

  if (!decoded || !decoded.header || !decoded.header.kid)
    return res.status(401).json({ error: 'Invalid token structure' })

  const pem = pems[decoded.header.kid]
  if (!pem) return res.status(401).json({ error: 'Token key not found' })

  jwt.verify(token, pem, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' })
    req.user = payload
    next()
  })
}

module.exports = verifyToken
