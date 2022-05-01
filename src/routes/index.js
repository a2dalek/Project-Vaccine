const homepageRoute = require('./homepage');
const vaccinationsRoute = require('./vaccination');
const vaccineStationRoute = require('./vaccineStation');
const staffMemberRoute = require('./staffmember');
const diagnoseRoute = require('./diagnose');
const patientRoute = require('./patient');
const profileRoute = require('./profile');
const authRoute = require('./auth')

function route(app) {
    
    app.use('/vaccinations', vaccinationsRoute);
    app.use('/vaccinestations', vaccineStationRoute);
    app.use('/staffmembers', staffMemberRoute);
    app.use('/diagnoses', diagnoseRoute);
    app.use('/patients', patientRoute);
    app.use('/auth', authRoute);
    app.use('/profile', profileRoute);
    app.use('/', homepageRoute);

}

module.exports = route;
