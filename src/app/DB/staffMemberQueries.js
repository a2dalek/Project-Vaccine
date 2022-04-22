const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccinationsQueries = require('./vaccinationQueries');

class StaffMemberQueries {

     // Find staff member by social security number

     async getStaffMemberBySocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.object({
        //     vaccineStationId: Joi.number().required(),
        //     name: Joi.string().required(),
        //     phone: Joi.string().required(),
        //     address: Joi.string().required()
        // });

        try {
            var getStaffMemberBySocialSecurityNumberQuery = 'SELECT * \
                                      FROM staffmembers \
                                      WHERE staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
            
                                      
            const staffMembersList = await dbQuery(getStaffMemberBySocialSecurityNumberQuery);
            const staffMember = staffMembersList[0];
             
            const vaccinationsList = await vaccinationsQueries.getVaccinationsByStaffMemberSocialSecurityNumber(socialSecurityNumber);
            // const validatedResults = responseBodySchema.validate(vaccineStation);
            return {
                staffMemberSocialSecurityNumber: staffMember.staffMemberSocialSecurityNumber,
                name: staffMember.name,
                dateOfBirth: staffMember.dateOfBirth,
                phone: staffMember.phone,
                role: staffMember.role,
                vaccinationsTokePartIn: vaccinationsList
            };
        } catch (error) {
            throw error;
        }
    };

    // Find staff members by vaccinationId

    async getAllStaffMembers() {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getAllStaffMembersQuery = 'SELECT *\
                                       FROM staffmembers';
            
        try {
            const results = await dbQuery(getAllStaffMembersQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };

    // Find staff members by vaccinationId

    async getStaffMembersByVaccinationId(vaccinationID) {

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

}

module.exports = new StaffMemberQueries;
