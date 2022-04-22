const express = require('express');
const route = express.Router();

const diagnosesController = require('../app/controllers/diagnoseController');

route.use('/all', diagnosesController.all);
route.use('/', diagnosesController.getByPatientSocialSecurityNumber);


module.exports = route;