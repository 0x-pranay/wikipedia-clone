var express = require('express');
var router = express.Router();

// Require controller modules
const users_controller = require('../controllers/userController');


/// USERS ROUTES

// GET users welcome page
router.get('/', users_controller.index);

// Login page
router.get('/login', users_controller.users_login);

// Register Page
router.get('/register', users_controller.users_register);

module.exports = router;
