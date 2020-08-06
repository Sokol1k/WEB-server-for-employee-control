const config = require('config')
const mongoose = require('mongoose')
const Employee = require('../../models/Employee')

const data = require('./employee.data.json')

const pushDataEmployee = async () => {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    let id

    for (let i = 0; i < data.length; i++) {

      const employee = new Employee(data[i])

      employee.save()

      id = employee._id

    }

    return id

  } catch (e) {

    console.log('Server Error', e.message)
    process.exit(1)

  }

}

module.exports = pushDataEmployee