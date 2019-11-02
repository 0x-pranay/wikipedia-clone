var express = require('express');
var router = express.Router();

// Require controller modules
const users_controller = require('../controllers/userController');


/// USERS ROUTES

// GET users welcome page.
router.get('/', users_controller.index);

// GET Login page.
router.get('/login', users_controller.users_get_login);

// POST Login page.
router.post('/login', users_controller.users_post_login);

// get Register Page.
router.get('/register', users_controller.users_get_register);

// Post Register page.
router.post('/register', users_controller.users_post_register);

// GET logout user
router.get('/logout', users_controller.users_logout);


module.exports = router;
