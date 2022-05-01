const express = require('express');
const route = express.Router();
const {isAuth, isAdmin, isThisUser} = require('../app/auth/authMiddlewares');

const patientController = require('../app/controllers/patientController');

route.get('/all', isAuth, isAdmin, patientController.all);

module.exports = route;
