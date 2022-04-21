const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');

route.use('/:ID', vaccinationsController.getByID)
route.use('/', vaccinationsController.all);


module.exports = route;