const express = require('express');
const route = express.Router();

const mainpageController = require('../app/controllers/mainpageController');

route.use('/', mainpageController.index);

module.exports = route;

