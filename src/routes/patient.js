const express = require('express');
const route = express.Router();
const {isAuth, isAdmin, isThisUser} = require('../app/auth/authMiddlewares');

const patientController = require('../app/controllers/patientController');

route.get('/all', isAuth, isAdmin, patientController.all);
route.delete('/delete', isAuth, isAdmin, patientController.deleteFromRegistration);

module.exports = route;
