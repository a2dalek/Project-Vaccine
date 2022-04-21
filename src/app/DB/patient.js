const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');

class PatientMemberQueries {

    async getPatientByVaccination(vaccinationID) {

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

}

module.exports = new PatientMemberQueries;


