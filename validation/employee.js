const Joi = require('@hapi/joi')

const createValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    patronymic: Joi.string().min(2).max(255).required(),
    gender: Joi.string().min(2).max(10).required(),
    contact: Joi.string().min(2).max(255).required(),
    birthday: Joi.date().allow(null).required(),
    salary: Joi.number().required(),
    position: Joi.string().min(2).max(255).required()
  })

  return schema.validate(data)
}

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    patronymic: Joi.string().min(2).max(255).required(),
    gender: Joi.string().min(2).max(10).required(),
    contact: Joi.string().min(2).max(255).required(),
    birthday: Joi.date().allow(null).required(),
    salary: Joi.number().required(),
    position: Joi.string().min(2).max(255).required()
  })

  return schema.validate(data)
}

module.exports = {
  createValidation,
  updateValidation
}