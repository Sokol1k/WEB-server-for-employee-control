const Employee = require('../models/Employee')

const index = async function (req, res) {
  try {

    const amount = 3
    const page = +req.params.page || 1

    const search = {}

    if (req.query.name) {
      search.name = { $regex: new RegExp(req.query.name, "i") }
    }

    if (req.query.surname) {
      search.surname = { $regex: new RegExp(req.query.surname, "i") }
    }

    if (req.query.patronymic) {
      search.patronymic = { $regex: new RegExp(req.query.patronymic, "i") }
    }

    if (req.query.position) {
      search.position = { $regex: new RegExp(req.query.position, "i") }
    }

    if (req.query.salary) {
      search.salary = req.query.salary
    }

    if (req.query.birthday) {
      search['$where'] = `this.birthday.toJSON().split("T")[0].includes("${req.query.birthday}")`
    }

    const employees = await Employee.find(search)
      .limit(amount)
      .skip(amount * (page - 1))

    res.send(employees)

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

    const employee = await Employee.deleteOne({ _id: req.params.id })

    if (!employee.deletedCount) {
      res.status(400).send({
        message: 'There is no such employee!'
      })
    } else {
      res.send({ message: 'Employee has been deleted!' })
    }

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