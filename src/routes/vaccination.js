const express = require('express');
const route = express.Router();

const vaccinationsController = require('../app/controllers/vaccinationsController');
const {isAuth, isAdmin, isThisUser} = require('../app/auth/authMiddlewares');

route.get('/all', isAuth, vaccinationsController.all);
route.post('/:ID/add', isAuth, isAdmin, vaccinationsController.addStaffMember);
route.post('/assign', isAuth, isThisUser, vaccinationsController.assign)
route.get('/:ID', isAuth, isAdmin, vaccinationsController.getByID)
route.post('/new', isAuth, isAdmin, vaccinationsController.insert)

module.exports = route;
