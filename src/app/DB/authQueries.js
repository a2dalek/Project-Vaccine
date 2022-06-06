const dbQuery = require('./ultis');
const mysql = require('mysql');
const newError = require('../utils/Error/index');

class AuthQueries {

    //get type

    async getTypeSSN(SSN){

        try {
            var getPatientBySocialSecurityNumberQuery = 'SELECT * \
                            FROM patients \
                            WHERE patientSocialSecurityNumber=' + mysql.escape(SSN);

            const patientsList = await dbQuery(getPatientBySocialSecurityNumberQuery);
            if (patientsList[0]) {
                return "user";
            }

            var getStaffMemberBySocialSecurityNumberQuery = 'SELECT * \
                                      FROM staffmembers \
                                      WHERE staffMemberSocialSecurityNumber=' + mysql.escape(SSN);
            
            const staffMembersList = await dbQuery(getStaffMemberBySocialSecurityNumberQuery);

            if (staffMembersList[0]) {
                return "staff member";
            }
            
            return "admin";
        } catch (error) {
            throw error;
        }
    };

}

module.exports = new AuthQueries;
