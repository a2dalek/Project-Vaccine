const express = require('express');
const route = express.Router();

const patientController = require('../app/controllers/patientController');

route.use('/all', patientController.all);
route.use('/:socialsecuritynumber', patientController.getBySocialSecurityNumber)


module.exports = route;