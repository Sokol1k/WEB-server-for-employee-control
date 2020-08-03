const router = require('express').Router();

const register = require('./auth/Register');
const login = require('./auth/Login');

router.post('/auth/register', register);
router.post('/auth/login', login);

module.exports = router;
