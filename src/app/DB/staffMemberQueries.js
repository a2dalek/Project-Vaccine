const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccinationsQueries = require('./vaccinationQueries');

class StaffMemberQueries {

     // Find staff member by social security number

     async getStaffMemberBySocialSecurityNumber(socialSecurityNumber) {

        //TODO: add validation

        try {
            var getStaffMemberBySocialSecurityNumberQuery = 'SELECT * \
                                      FROM staffmembers \
                                      WHERE staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
            
            const staffMembersList = await dbQuery(getStaffMemberBySocialSecurityNumberQuery);
            const staffMember = staffMembersList[0];
            console.log(staffMember)
            
            var getVaccinationsByStaffMemberSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN shifts\
            ON shifts.vaccinationID=vaccinations.vaccinationID\
            AND shifts.staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const vaccinationsList = await dbQuery(getVaccinationsByStaffMemberSocialSecurityNumberQuery);
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

        //TODO: add validation

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

        //TODO: add validation

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

    //insert staff member
    async insertStaffMember(request) {
        
        try {
            var insertIntoStaffMemberQuery = 'INSERT INTO vaccine.staffmembers(staffMemberSocialSecurityNumber, name, role, phone, dateOfBirth) VALUES(?, ?, ?, ?, ?)';

            const results = await dbQuery(insertIntoStaffMemberQuery, [
                request.body.SSN,
                request.body.name,
                request.body.role,
                request.body.phone,
                request.body.dateOfBirth
            ]);

            return results;

        } catch (error) {
            throw error;
        }

    };

}

module.exports = new StaffMemberQueries;
