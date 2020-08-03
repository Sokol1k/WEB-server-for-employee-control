const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  patronymic: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  gender: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  contact: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  birthday: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0
  },
  position: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = model('Employee', schema)