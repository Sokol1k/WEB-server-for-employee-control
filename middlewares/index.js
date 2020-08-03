const router = require('express').Router();

const register = require('./auth/Register');

router.post('/auth/register', register);

module.exports = router;
