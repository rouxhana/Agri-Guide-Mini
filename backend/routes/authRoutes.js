const express = require('express');
const router = express.Router();
const { register, login, registerRequest, verifyOTP } = require('../controllers/authController');

router.post('/register', register);
router.post('/register-request', registerRequest);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

module.exports = router;
