const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccineStationQueries = require('./vaccineStation');
const staffMemberQueries = require('./staffMember');
const patientMemberQueries = require('./patient');
const { json } = require('express/lib/response');

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

    //Find vaccination by id

    async getVaccinationByID(Id) {

        // const responseBodySchema = Joi.array().items({
        //     vaccination: Joi.object({
        //         vaccinationID: Joi.number().required(),
        //         vaccineStation: Joi.string().required(),
        //         limitNumber: Joi.number().required(),
        //         date: Joi.date().required(),
        //         vaccineType: Joi.string().required()
        //     })
        // })

        // var getAllVaccinationsQuery = 'SELECT vaccinationID, name, limitNumber, date, vaccineType \
        //                                FROM vaccinations \
        //                                LEFT JOIN vaccineStations \
        //                                ON vaccinations.vaccineStationId=vaccineStations.vaccineStationId';

        var getVaccinationByIdQuery = 'SELECT * \
                                  FROM vaccinations \
                                  WHERE vaccinationID=' + mysql.escape(Id);
             
        try {
            const vaccinationList = await dbQuery(getVaccinationByIdQuery);
            const vaccination = vaccinationList[0];
            
            const vaccineStation = await vaccineStationQueries.getVaccineStationByID(vaccination.vaccineStationId);
            const staffMemberList = await staffMemberQueries.getStaffMembersByVaccination(Id);
            const patientList = await patientMemberQueries.getPatientByVaccination(Id);

            return {
                vaccinationID: Id,
                vaccineStation: vaccineStation,
                limitNumber: vaccination.limitNumber,
                date: vaccination.date,
                vaccineType: vaccination.vaccineType,
                staffMembersList: staffMemberList,
                patientsList: patientList
            }

        } catch (error) {
            throw error;
        }
        
    };

}

module.exports = new vaccinationsQueries;
