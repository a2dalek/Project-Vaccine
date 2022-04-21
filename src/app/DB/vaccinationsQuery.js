const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');

class vaccinationsQueries {

    //Find all vaccinations

    async getAllVaccinations() {

        const responseBodySchema = Joi.array().items({
            vaccination: Joi.object({
                vaccinationID: Joi.number().required(),
                vaccineStation: Joi.string().required(),
                limitNumber: Joi.number().required(),
                date: Joi.date().required(),
                vaccineType: Joi.string().required()
            })
        })

        var getAllVaccinationsQuery = 'SELECT vaccinationID, name, limitNumber, date, vaccineType \
                                       FROM vaccinations \
                                       LEFT JOIN vaccineStations \
                                       ON vaccinations.vaccineStationId=vaccineStations.vaccineStationId';
             
        try {
            const results = await dbQuery(getAllVaccinationsQuery);
            const validatedResults = responseBodySchema.validate(results);
            return validatedResults;
        } catch (error) {
            throw error;
        }
        
    };

}

module.exports = new vaccinationsQueries;
