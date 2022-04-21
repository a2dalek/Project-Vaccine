const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');

class vaccineStationQueries {

    //Find vaccineStation by id

    async getVaccineStationByID(Id) {

        const responseBodySchema = Joi.object({
            vaccineStationId: Joi.number().required(),
            name: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required()
        });

        try {
            var getVaccineStationQuery = 'SELECT * \
                                      FROM vaccinestations \
                                      WHERE vaccineStationId=' + mysql.escape(Id);
            
            const vaccineStationsList = await dbQuery(getVaccineStationQuery);
            const vaccineStation = vaccineStationsList[0];
            const validatedResults = responseBodySchema.validate(vaccineStation);
            return vaccineStation;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = new vaccineStationQueries;
