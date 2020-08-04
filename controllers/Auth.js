const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const register = async function (req, res) {
  try {

    const { login, password, email } = req.body

    const emailCheck = await User.findOne({ email })

    if (emailCheck) {
      return res.status(403).send({
        email: "This email is not free!"
      })
    }

    const loginCheck = await User.findOne({ login })

    if (loginCheck) {
      return res.status(403).send({
        login: "This login is not free!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ login, email, password: hashedPassword })

    await user.save()

    res.status(201).send({
      message: "User has been registered!"
    })

  } catch (err) {
    res.status(500).send(err)
  }
}

const login = async function (req, res) {
  try {

    const { login, password } = req.body

    const user = await User.findOne({ login })

    if (!user) {
      return res.status(403).send({
        message: "Invalid login information!"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(403).send({
        message: "Invalid login information!"
      })
    }

    const token = jwt.sign(
      { user },
      config.get('jwtSecret'),
      { expiresIn: '1d' }
    )

    res.send({ token })

  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  register,
  login
}