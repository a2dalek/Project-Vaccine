const dbQuery = require('./ultis');
const mysql = require('mysql');

class DiagnoseQueries {

    //Find all diagnoses

    async getAllDiagnoses() {

        //TODO: Add validation

        var getAllDiagnosesQuery = 'SELECT diagnoseID, patientSocialSecurityNumber, symptomName, criticality, date \
                                       FROM diagnoses \
                                       INNER JOIN symptoms \
                                       ON diagnoses.symptomID=symptoms.symptomID';
             
        try {
            const diagnosesList = await dbQuery(getAllDiagnosesQuery);
            return diagnosesList;
        } catch (error) {
            throw error;
        }
        
    };

    //Find diagnoses by patient social security number

    async getDiagnosesBySSN(SSN) {

        //TODO: add validation

        var getDiagnosesBySocialSecurityNumberQuery = 'SELECT diagnoseID, symptomName, criticality, date \
                                                       FROM diagnoses \
                                                       INNER JOIN symptoms \
                                                       ON diagnoses.symptomID=symptoms.symptomID \
                                                       AND diagnoses.patientSocialSecurityNumber=' + mysql.escape(SSN);
             
        try {
            const diagnosesList = await dbQuery(getDiagnosesBySocialSecurityNumberQuery);
            return diagnosesList;

        } catch (error) {
            throw error;
        }
        
    };

}

module.exports = new DiagnoseQueries;
