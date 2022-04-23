const express = require('express');
const route = express.Router();
const {body} = require('express-validator');
const loginController = require('../app/controllers/loginController');


route.post('/',[
    body('SSN', "Not empty and Alphanumeric only")
        .notEmpty()
        .trim()
        .isLength({min: 11 })
        .isLength({max: 11 }),
  /*  body('password',"Not empty and Minimum 6 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),*/
],loginController.login);

module.exports = route;