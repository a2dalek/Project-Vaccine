const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');

route.use('/', vaccinationsController.index);

module.exports = route;