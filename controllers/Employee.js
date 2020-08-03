const Employee = require('../models/Employee')

const index = async function (req, res) {

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
      message: "Employee has been created!"
    })

  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {

}

const destroy = async function (req, res) {

}

module.exports = {
  index,
  create,
  update,
  destroy
}