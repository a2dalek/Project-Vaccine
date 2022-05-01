const dbQuery = require('./ultis');
const diagnoseQueries = require('./diagnoseQueries');
const mysql = require('mysql');

class PatientQueries {

    // Find patients by vaccinationId
    
    async getPatientsByVaccinationId(vaccinationID) {

        //TODO: add validation

        var getPatientsByVaccinationQuery = 'SELECT patients.patientSocialSecurityNumber,  \
                                       patients.name, patients.gender, patients.dateOfBirth \
                                       FROM vaccineregistrations \
                                        INNER JOIN patients \
                                       ON patients.patientSocialSecurityNumber=vaccineregistrations.patientSocialSecurityNumber \
                                       AND vaccineregistrations.vaccinationID=' + mysql.escape(vaccinationID);
        try {
            const patientsList = await dbQuery(getPatientsByVaccinationQuery);
            return patientsList;
        } catch (error) {
            throw error;
        }
        
    };

    // Find all patients
    
    async getAllPatients() {

        //TODO: add validation

        var getAllPatientsQuery = 'SELECT * FROM patients';

        try {
            const patientsList = await dbQuery(getAllPatientsQuery);
            return patientsList;
        } catch (error) {
            throw error;
        }
        
    };


    //Find patient by social security number

    async getPatientBySSN(SSN) {

        //TODO: add validation

        var getPatientBySocialSecurityNumberQuery = 'SELECT * \
                                  FROM patients \
                                  WHERE patientSocialSecurityNumber=' + mysql.escape(SSN);

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
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(SSN);
                                                       
            const vaccinationsList = await dbQuery(getVaccinationsByPatientSocialSecurityNumberQuery);

            const diagnosesList = await diagnoseQueries.getDiagnosesBySSN(SSN);
            
            return {
                patientSocialSecurityNumber: SSN,
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

    //Insert patient

    async insertPatient(request) {
        
        try {
            var insertIntoPatientQuery = 'INSERT INTO vaccine.patients(patientSocialSecurityNumber, name, gender, dateOfBirth) VALUES(?, ?, ?, ?)';

            const results = await dbQuery(insertIntoPatientQuery, [
                request.body.SSN,
                request.body.name,
                request.body.gender,
                request.body.dateOfBirth
            ]);
            return results;

        } catch (error) {
            throw error;
        }

    }

}

module.exports = new PatientQueries;


