const router = require('express').Router()

const verifyToken = require('./verifyToken')
const register = require('./auth/Register')
const login = require('./auth/Login')
const employee = require('./employee')

router.use(verifyToken)

router.post('/auth/register', register)
router.post('/auth/login', login)

router.post('/employee', employee.create)
router.post('/employee/:id', employee.update)

module.exports = router
