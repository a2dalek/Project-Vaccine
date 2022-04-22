const express = require('express');
const route = express.Router();

const staffMemberController = require('../app/controllers/staffMemberController');

route.use('/all', staffMemberController.all);
route.use('/:socialsecuritynumber', staffMemberController.getBySocialSecurityNumber);
route.use('/', staffMemberController.getByVaccinationId);


module.exports = route;