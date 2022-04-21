const mainpageRoute = require('./mainpage');
const vaccinationsRoute = require('./vaccinations');

function route(app) {
    
    app.use('/vaccinations', vaccinationsRoute);
    app.use('/', mainpageRoute);

}

module.exports = route;
