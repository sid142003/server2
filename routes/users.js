const { registerUser, loginUser } = require('../controllers/userController');
const express = require('express');
const router = express.Router();



// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

module.exports = router;
