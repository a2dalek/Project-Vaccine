const express = require('express');
const route = express.Router();

const vaccineStationController = require('../app/controllers/vaccineStationController');

route.use('/:ID', vaccineStationController.getByID)
// route.use('/', vaccineStationController.all);


module.exports = route;