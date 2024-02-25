const { login, signup, logout, protection } = require('../controllers/auth.js');
const { Router } = require('express');

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', protection,logout)

module.exports = router;