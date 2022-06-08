const express = require('express');
const route = express.Router();
const symptomController = require('../app/controllers/symptomController');

route.get('/all', symptomController.getAll);

module.exports = route;