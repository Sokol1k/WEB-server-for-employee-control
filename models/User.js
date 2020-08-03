const { Schema, model } = require('mongoose')

const schema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 255
  }
})

module.exports = model('User', schema)