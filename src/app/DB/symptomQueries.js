const dbQuery = require('./ultis');
const mysql = require('mysql');

class SymptomQueries {

    //get all symptoms

    async getAll(){

        try {
            var getAllSymptomsQuery = 'SELECT symptomName, IF(criticality=1, "Dangerous", "Safe") AS Criticality FROM symptoms;'

            const symptomsList = await dbQuery(getAllSymptomsQuery);
            return symptomsList;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = new SymptomQueries;
