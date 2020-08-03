const router = require('express').Router()

const verifyToken = require('./verifyToken')
const register = require('./auth/Register')
const login = require('./auth/Login')

router.use(verifyToken)

router.post('/auth/register', register)
router.post('/auth/login', login)

module.exports = router
