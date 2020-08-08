const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return res.status(400).send({ message: 'Token malformed' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token malformed' })
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: 'Token invalid' })
    }
    req.userId = decoded.id

    return next()
  })
}
