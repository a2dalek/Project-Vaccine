const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');

route.use('/', vaccinationsController.all);
route.use('/:index', vaccinationsController.getByIndex)

module.exports = route;