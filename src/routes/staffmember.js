const express = require('express');
const route = express.Router();
const {isAuth, isAdmin} = require('../app/auth/authMiddlewares');

const staffMemberController = require('../app/controllers/staffMemberController');

route.get('/all', isAuth, isAdmin, staffMemberController.all);
route.delete('/delete', isAuth, isAdmin, staffMemberController.deleteFromShift);

module.exports = route;
