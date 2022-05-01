const express = require('express');
const route = express.Router();

const AuthController = require('../app/controllers/authController');

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);

module.exports = route;
