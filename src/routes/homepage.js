const express = require('express');
const route = express.Router();

const homepageController = require('../app/controllers/homepageController');

route.get('/', homepageController.index);

module.exports = route;

