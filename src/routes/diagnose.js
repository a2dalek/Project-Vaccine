const express = require('express');
const { string } = require('joi');
const route = express.Router();
const {isAuth, isAdmin} = require('../app/auth/authMiddlewares');

const diagnosesController = require('../app/controllers/diagnoseController');

route.get('/all', isAuth, isAdmin, diagnosesController.all);

module.exports = route;
