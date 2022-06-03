const express = require('express');
const route = express.Router();

const vaccineStationController = require('../app/controllers/vaccineStationController');
const {isAuth, isAdmin} = require('../app/auth/authMiddlewares');

route.get('/all', vaccineStationController.all);
route.post('/new', isAuth, isAdmin, vaccineStationController.insertVaccineStation);
route.get('/:ID', vaccineStationController.getByID);

module.exports = route;
