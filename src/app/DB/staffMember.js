const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');

class StaffMemberQueries {

    async getStaffMembersByVaccination(vaccinationID) {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getStaffMembersByVaccinationQuery = 'SELECT staffmembers.staffMemberSocialSecurityNumber,  \
                                       staffmembers.name, staffmembers.dateOfBirth, staffmembers.phone, staffmembers.role\
                                       FROM shifts \
                                        INNER JOIN staffmembers \
                                       ON staffmembers.staffMemberSocialSecurityNumber=shifts.staffMemberSocialSecurityNumber \
                                       AND shifts.vaccinationID=' + mysql.escape(vaccinationID);
        try {
            const results = await dbQuery(getStaffMembersByVaccinationQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };


    //Find vaccineStation by id

    // async getVaccineStationByID(Id) {

    //     const responseBodySchema = Joi.object({
    //         vaccineStationId: Joi.number().required(),
    //         name: Joi.string().required(),
    //         phone: Joi.string().required(),
    //         address: Joi.string().required()
    //     });

    //     try {
    //         var getVaccineStationQuery = 'SELECT * \
    //                                   FROM vaccinestations \
    //                                   WHERE vaccineStationId=' + mysql.escape(Id);
            
    //         const vaccineStationsList = await dbQuery(getVaccineStationQuery);
    //         const vaccineStation = vaccineStationsList[0];
    //         const validatedResults = responseBodySchema.validate(vaccineStation);
    //         return validatedResults;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

}

module.exports = new StaffMemberQueries;
