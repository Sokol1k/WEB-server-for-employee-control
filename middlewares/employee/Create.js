const { createValidation } = require('../../validation/employee')

module.exports = function (req, res, next) {
  const { error } = createValidation(req.body)
  if (error) {
    return res.status(422).send({
      [error.details[0].context.key]: error.details[0].message
    })
  } else {
    next()
  }
}