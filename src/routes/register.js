const express = require('express');
const route = express.Router();
const {body} = require('express-validator');
const registerController = require('../app/controllers/registerController');

route.post('/', [
    body('name',"")
        .notEmpty()
        .escape()
        .trim()
        .isLength({min: 2}),
    body('password',"Not empty and Minimum 6 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 6 })
        .isLength({max: 32 }),
    body('SSN', "Not empty")
        .notEmpty()
        .trim()
        .isLength({min: 11 })
        .isLength({max: 11 }),
    body('gender', "Not empty")
        .notEmpty()
        .trim(),
    body('dateOfBirth', "Not empty")
        .notEmpty()
        .trim()
        .isDate(),
    //date format: yyyy-mm-dd
], registerController.register);


module.exports = route;