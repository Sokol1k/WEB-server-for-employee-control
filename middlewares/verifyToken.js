const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }

  if (req.path == '/auth/login' || req.path == '/auth/register') {
    return next();
  }

  try {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).send({ message: 'Access Denied' })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()

  } catch (e) {
    res.status(403).send({ message: 'Invalid Token' });
  }
}