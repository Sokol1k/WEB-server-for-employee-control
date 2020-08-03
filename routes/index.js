const router = require("express").Router()
const auth = require('../controllers/Auth')
const user = require('../controllers/User')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)

router.delete('/user', user.destroy)

module.exports = router