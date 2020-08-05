const router = require("express").Router()
const auth = require('../controllers/Auth')
const user = require('../controllers/User')
const employee = require('../controllers/Employee')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

router.delete('/user', user.destroy)

router.get('/employee/:page([0-9]+)?', employee.index)
router.get('/employee/:id', employee.show)
router.post('/employee', employee.create)
router.put('/employee/:id', employee.update)
router.delete('/employee/:id', employee.destroy)

module.exports = router