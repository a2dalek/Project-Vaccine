const mainpageRoute = require('./mainpage');
const vaccinationsRoute = require('./vaccination');
const vaccineStationRoute = require('./vaccineStation');
const staffMemberRoute = require('./staffmember');
const diagnoseRoute = require('./diagnose');
const patientRoute = require('./patient');

function route(app) {
    
    app.use('/vaccinations', vaccinationsRoute);
    app.use('/vaccinestations', vaccineStationRoute);
    app.use('/staffmembers', staffMemberRoute);
    app.use('/diagnoses', diagnoseRoute);
    app.use('/patients', patientRoute)
    app.use('/', mainpageRoute);

}

module.exports = route;
