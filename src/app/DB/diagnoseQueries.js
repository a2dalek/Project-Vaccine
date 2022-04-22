const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccineStationQueries = require('./vaccineStationQueries');
const staffMemberQueries = require('./staffMemberQueries');
const patientMemberQueries = require('./patientQueries');
const { json } = require('express/lib/response');

class DiagnoseQueries {

    //Find all diagnoses

    async getAllDiagnoses() {

        // const responseBodySchema = Joi.array().items({
        //     vaccination: Joi.object({
        //         vaccinationID: Joi.number().required(),
        //         vaccineStation: Joi.string().required(),
        //         limitNumber: Joi.number().required(),
        //         date: Joi.date().required(),
        //         vaccineType: Joi.string().required()
        //     })
        // })

        var getAllDiagnosesQuery = 'SELECT diagnoseID, patientSocialSecurityNumber, symptomName, criticality, date \
                                       FROM diagnoses \
                                       INNER JOIN symptoms \
                                       ON diagnoses.symptomID=symptoms.symptomID';
             
        try {
            const diagnosesList = await dbQuery(getAllDiagnosesQuery);
            // const validatedResults = responseBodySchema.validate(results);
            return diagnosesList;
        } catch (error) {
            throw error;
        }
        
    };

    //Find diagnoses by patient social security number

    async getDiagnosesBySocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.array().items({
        //     vaccination: Joi.object({
        //         vaccinationID: Joi.number().required(),
        //         vaccineStation: Joi.string().required(),
        //         limitNumber: Joi.number().required(),
        //         date: Joi.date().required(),
        //         vaccineType: Joi.string().required()
        //     })
        // })

        var getDiagnosesBySocialSecurityNumberQuery = 'SELECT diagnoseID, symptomName, criticality, date \
                                                       FROM diagnoses \
                                                       INNER JOIN symptoms \
                                                       ON diagnoses.symptomID=symptoms.symptomID \
                                                       AND diagnoses.patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
             
        try {
            const diagnosesList = await dbQuery(getDiagnosesBySocialSecurityNumberQuery);
            return diagnosesList;

        } catch (error) {
            throw error;
        }
        
    };

}

module.exports = new DiagnoseQueries;
