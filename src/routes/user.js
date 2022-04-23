const express = require('express');
const route = express.Router();
const userController = require('../app/controllers/userController');

route.get('/',userController.getUser);

module.exports = route;