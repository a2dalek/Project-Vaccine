const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');

route.use('/all', vaccinationsController.all);
route.use('/:ID', vaccinationsController.getByID)


module.exports = route;