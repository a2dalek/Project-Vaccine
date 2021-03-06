const DB = require('../DB/DBconnect');
const newError = require('../utils/Error/index');

function dbQuery(databaseQuery, parameters) {
    return new Promise(data => {
        if (!parameters) {
            DB.DBcon.query(databaseQuery, function (error, result) {
                if (error) {
                    console.log(error);
                }
                try {
                    data(result);
                } catch (error) {
                    data({});
                    throw error;
                }
    
            });
        } else {
            DB.DBcon.query(databaseQuery, parameters, function (error, result) {
                if (error) {
                    console.log(error);
                }
                try {
                    data(result);
                } catch (error) {
                    data({});
                    throw error;
                }
            });
        }
    });
}



module.exports = dbQuery;