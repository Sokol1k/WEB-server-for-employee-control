const { registerValidation } = require('../../validation/auth')

module.exports = function (req, res, next) {
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(422).send({
      [error.details[0].context.key]: error.details[0].message
    })
  } else {
    next()
  }
}