const { login, signup } = require('../controllers/auth.js');
const { Router } = require('express');

const router = Router()

router.post('/signup', signup)
router.post('/login', login)

module.exports = router;