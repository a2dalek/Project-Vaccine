const dbQuery = require('./ultis');
const mysql = require('mysql');

class vaccineStationQueries {

    //Find vaccineStation by id

    async getVaccineStationByID(Id) {

        //TODO: add validation

        try {
            var getVaccineStationQuery = 'SELECT * \
                                      FROM vaccinestations \
                                      WHERE vaccineStationId=' + mysql.escape(Id);
            
            const vaccineStationsList = await dbQuery(getVaccineStationQuery);
            const vaccineStation = vaccineStationsList[0];
            return vaccineStation;
        } catch (error) {
            throw error;
        }
    };

    //Find all vaccine stations

    async getAllVaccineStations() {

        //TODO: add validation

        try {
            var getAllVaccineStationsQuery = 'SELECT * FROM vaccinestations';
            
            const vaccineStationsList = await dbQuery(getAllVaccineStationsQuery);
            return vaccineStationsList;
        } catch (error) {
            throw error;
        }
    };

    //Insert vaccine stations

    async insertVaccineStations(insertValue) {

        try {
            var insertVaccineStationQuery = 'INSERT INTO vaccine.vaccinestations(name, phone, address) VALUES(?, ?, ?)';
            var parameters = [
                insertValue.name,
                insertValue.phone,
                insertValue.address
            ];

            const vaccineStation = await dbQuery(insertVaccineStationQuery, parameters);
            return vaccineStation;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = new vaccineStationQueries;
