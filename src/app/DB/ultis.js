const DB = require('../DB/DBconnect');

function dbQuery(databaseQuery) {
    return new Promise(data => {
        DB.DBcon.query(databaseQuery, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                data(result);
            } catch (error) {
                data({});
                throw error;
            }

        });
    });
}

module.exports = dbQuery;