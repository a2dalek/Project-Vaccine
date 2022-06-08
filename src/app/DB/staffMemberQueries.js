const Joi = require('joi');
const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccinationsQueries = require('./vaccinationQueries');
const newError = require('../utils/Error/index');

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
            
            var getVaccinationsByStaffMemberSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN shifts\
            ON shifts.vaccinationID=vaccinations.vaccinationID\
            AND shifts.staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const vaccinationsList = await dbQuery(getVaccinationsByStaffMemberSocialSecurityNumberQuery);
            
            var today = new Date();
            var future = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today <= currentDate);
            });

            var past = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today > currentDate)
            });


            return {
                staffMemberSocialSecurityNumber: staffMember.staffMemberSocialSecurityNumber,
                name: staffMember.name,
                dateOfBirth: staffMember.dateOfBirth,
                phone: staffMember.phone,
                role: staffMember.role,
                vaccinationsTokePartIn: {future, past}
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
            var insertIntoStaffMemberQuery = 'INSERT INTO staffmembers(staffMemberSocialSecurityNumber, name, role, phone, dateOfBirth) VALUES(?, ?, ?, ?, ?)';

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

    //Delete staff member from shift

    async deleteFromShifts(ID, SSN) {

        try {

            var findShiftQuery = "SELECT * FROM shifts WHERE vaccinationID=? AND staffMemberSocialSecurityNumber=?"
            var findShiftParameter = [
                ID,
                SSN
            ]

            const shiftsList = await dbQuery(findShiftQuery, findShiftParameter);
            if (!shiftsList[0]) {
                throw new newError({
                    error: 11010,
                    error_type: "This shift doesn't exist",
                    data:[]
                })
            }
            
            var findVaccinationQuery = "SELECT * FROM vaccinations WHERE vaccinationID=?"
            var findVaccinationParameter = [
                ID
            ]

            const vaccinationsList = await dbQuery(findVaccinationQuery, findVaccinationParameter);
            if (!vaccinationsList[0]) {
                throw new newError({
                    error: 11007,
                    error_type: "This vaccination doesn't exist",
                    data:[]
                })
            }
            
            var vaccination = vaccinationsList[0];
            var today = new Date();
            var currentDate = new Date(vaccination.date);

            if (today > currentDate) {
                throw new newError({
                    error: 11011,
                    error_type: "Can not delete a shift in the past",
                    data:[]
                })
            }

            var deleteShiftQuery = 'DELETE FROM shifts WHERE vaccinationID=? AND staffMemberSocialSecurityNumber=?';
            var deleteShiftQueryParameters = [
                ID,
                SSN
            ];
            
            const result = await dbQuery(deleteShiftQuery, deleteShiftQueryParameters);
            
            return result;
        } catch (error) {
            throw error;
        }
    };

    //get free staff members

    async getFreeStaffMembers(date) {

        try {

            var findStaffMembersQuery = "SELECT * FROM staffmembers WHERE staffmembers.staffMemberSocialSecurityNumber NOT IN\
                                    (SELECT shifts.staffMemberSocialSecurityNumber FROM shifts WHERE shifts.vaccinationId IN\
                                        (SELECT vaccinationID FROM vaccinations WHERE date=?)\
                                    );"
            var findStaffMembersParameter = [
                date
            ]

            const staffMemberList = await dbQuery(findStaffMembersQuery, findStaffMembersParameter);
            return staffMemberList;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new StaffMemberQueries;
