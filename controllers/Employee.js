const Employee = require('../models/Employee')

const index = async function (req, res) {
  try {

  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  try {

    const employee = new Employee({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      gender: req.body.gender,
      contact: req.body.contact,
      birthday: req.body.birthday,
      salary: req.body.salary,
      position: req.body.position
    })

    await employee.save()

    res.status(201).send({
      message: 'Employee has been created!'
    })

  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try {

    const employee = await Employee.findById(req.params.id)

    employee.name = req.body.name
    employee.surname = req.body.surname
    employee.patronymic = req.body.patronymic
    employee.gender = req.body.gender
    employee.contact = req.body.contact
    employee.birthday = req.body.birthday
    employee.salary = req.body.salary
    employee.position = req.body.position

    await employee.save()

    res.send({
      message: 'Employee has been updated!'
    })

  } catch (err) {
    if (err.path === '_id') {
      res.status(400).send({
        message: 'There is no such employee!'
      })
    } else {
      res.status(500).send(err)
    }
  }
}

const destroy = async function (req, res) {
  try {

  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  index,
  create,
  update,
  destroy
}