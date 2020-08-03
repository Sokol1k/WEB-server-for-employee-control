const User = require('../models/User')
const bcrypt = require('bcryptjs')

const register = async function (req, res) {
  try {

    const { login, password, email } = req.body

    const loginCheck = await User.findOne({ login })

    if (loginCheck) {
      return res.status(403).send({
        login: "This login is not free!"
      })
    }

    const emailCheck = await User.findOne({ email })

    if (emailCheck) {
      return res.status(403).send({
        email: "This email is not free!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ login, email, password: hashedPassword })

    await user.save()

    res.status(201).send({
      message: "User has been registered!"
    });

  } catch (err) {
    res.status(500).send(err)
  }
}

const login = async function (req, res) {

}

module.exports = {
  register,
  login
}