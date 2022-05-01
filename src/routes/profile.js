const express = require('express');
const route = express.Router();
const profileController = require('../app/controllers/profileController');
const {isAuth, canViewUser} = require('../app/auth/authMiddlewares');

route.get('/:SSN', isAuth, canViewUser, profileController.getProfileBySSN);

module.exports = route;