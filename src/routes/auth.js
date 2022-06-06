const express = require('express');
const { isAuth, isAdmin } = require('../app/auth/authMiddlewares');
const route = express.Router();

const AuthController = require('../app/controllers/authController');

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.get('/:SSN', isAuth, isAdmin, AuthController.getType);

module.exports = route;
