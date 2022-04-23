const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');
const {validationResult} = require("express-validator");
const mysql = require("mysql");
const dbQuery = require("../app/DB/ultis");
const bcrypt = require("bcryptjs");
const DB = require("../app/DB/DBconnect");

route.use('/all', vaccinationsController.all);
route.use('/:ID', vaccinationsController.getByID)


module.exports = route;