const dbQuery = require('./ultis');
const mysql = require('mysql');
const PatientQueries = require('./patientQueries');
const bcrypt = require('bcryptjs/dist/bcrypt');
const newError = require('../utils/Error/index');

class AccountQueries {

    //Find account by SSN

    async getAccountBySSN(Id) {

        try {
            var getAccountBySSNQuery = 'SELECT * \
                                      FROM account \
                                      WHERE socialSecurityNumber=' + mysql.escape(Id);
            
            const accountsList = await dbQuery(getAccountBySSNQuery);
            if (accountsList[0]) {
                return accountsList[0];
            } else {
                return {};
            }
        } catch (error) {
            throw error;
        }
    };

    // insert patient account

    async insertPatientAccount(request) {
        
        try {
            var getSSN = 'SELECT socialSecurityNumber FROM account\
                            WHERE socialSecurityNumber =' + mysql.escape(request.body.SSN);
            const row = await dbQuery(getSSN);

            if (row[0]) {
                throw new newError({
                    error: 10002,
                    error_type: "The SSN already in use",
                    data:[]
                });
            }
            

            const patient = await PatientQueries.insertPatient(request);

            const hashPass = await bcrypt.hashSync(request.body.password);

            var insertIntoAccountQuery = 'INSERT INTO account(socialSecurityNumber, password, userType) VALUES(?, ?, ?)';

            const account = await dbQuery(insertIntoAccountQuery, [
                request.body.SSN,
                hashPass,
                request.body.userType,
            ]);

            return {};

        } catch (error) {
            throw error;
        }

    }

}

module.exports = new AccountQueries;
