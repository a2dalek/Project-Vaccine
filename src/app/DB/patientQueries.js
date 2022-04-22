const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const vaccinationQueries = require('./vaccinationQueries');
const diagnoseQueries = require('./diagnoseQueries');
const mysql = require('mysql');

class PatientQueries {

    // Find patients by vaccinationId
    
    async getPatientsByVaccinationId(vaccinationID) {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getPatientsByVaccinationQuery = 'SELECT patients.patientSocialSecurityNumber,  \
                                       patients.name, patients.gender, patients.dateOfBirth \
                                       FROM vaccineregistrations \
                                        INNER JOIN patients \
                                       ON patients.patientSocialSecurityNumber=vaccineregistrations.patientSocialSecurityNumber \
                                       AND vaccineregistrations.vaccinationID=' + mysql.escape(vaccinationID);
        try {
            const results = await dbQuery(getPatientsByVaccinationQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };

    // Find all patients
    
    async getAllPatients() {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getAllPatientsQuery = 'SELECT * FROM patients';

        try {
            const results = await dbQuery(getAllPatientsQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };


    //Find patient by social security number

    async getPatientBySocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.array().items({
        //     vaccination: Joi.object({
        //         vaccinationID: Joi.number().required(),
        //         vaccineStation: Joi.string().required(),
        //         limitNumber: Joi.number().required(),
        //         date: Joi.date().required(),
        //         vaccineType: Joi.string().required()
        //     })
        // })

        var getPatientBySocialSecurityNumberQuery = 'SELECT * \
                                  FROM patients \
                                  WHERE patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
             
        try {
            const patientsList = await dbQuery(getPatientBySocialSecurityNumberQuery);
            const patient = patientsList[0];
            
            var getVaccinationsByPatientSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN vaccineregistrations\
            ON vaccineregistrations.vaccinationID=vaccinations.vaccinationID\
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const vaccinationsList = await dbQuery(getVaccinationsByPatientSocialSecurityNumberQuery);

            const diagnosesList = await diagnoseQueries.getDiagnosesBySocialSecurityNumber(socialSecurityNumber);

            return {
                patientSocialSecurityNumber: socialSecurityNumber,
                name: patient.name,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                vaccinationsList: vaccinationsList,
                diagnosesList: diagnosesList
            }

        } catch (error) {
            throw error;
        }
        
    };


}

module.exports = new PatientQueries;


