const { login, signup, logout, protection, adminProtection } = require('../controllers/auth.js');
const { Router } = require('express');

const router = Router()

router.post('/signup', signup)
router.post('/login',login)
router.get('/logout', protection,logout)
router.get("/adminProtection",adminProtection)

module.exports = router;