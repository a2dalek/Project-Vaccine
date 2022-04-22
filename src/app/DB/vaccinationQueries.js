const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccineStationQueries = require('./vaccineStationQueries');
const staffMemberQueries = require('./staffMemberQueries');
const patientMemberQueries = require('./patientQueries');
const { json } = require('express/lib/response');

class VaccinationsQueries {

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
            const staffMemberList = await staffMemberQueries.getStaffMembersByVaccinationId(Id);
            const patientList = await patientMemberQueries.getPatientsByVaccinationId(Id);

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

    // Find vaccinations by staff member social security number

    async getVaccinationsByStaffMemberSocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        try {
            var getVaccinationsByStaffMemberSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN shifts\
            ON shifts.vaccinationID=vaccinations.vaccinationID\
            AND shifts.staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const results = await dbQuery(getVaccinationsByStaffMemberSocialSecurityNumberQuery);

            return results;
        } catch (error) {
            throw error;
        }
        
    };

    // Find vaccinations by staff member social security number

    async getVaccinationsByPatientSocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        try {
            var getVaccinationsByPatientSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN vaccineregistrations\
            ON vaccineregistrations.vaccinationID=vaccinations.vaccinationID\
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const results = await dbQuery(getVaccinationsByPatientSocialSecurityNumberQuery);
            
            return results;
        } catch (error) {
            throw error;
        }
        
    };
}

module.exports = new VaccinationsQueries;
