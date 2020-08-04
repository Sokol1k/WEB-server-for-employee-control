const router = require("express").Router()
const auth = require('../controllers/Auth')
const user = require('../controllers/User')
const employee = require('../controllers/Employee')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

router.delete('/user', user.destroy)

router.get('/employee/:page?', employee.index)
router.post('/employee', employee.create)
router.post('/employee/:id', employee.update)
router.delete('/employee/:id', employee.destroy)

module.exports = router