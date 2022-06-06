const dbQuery = require('./ultis');
const diagnoseQueries = require('./diagnoseQueries');
const mysql = require('mysql');
const newError = require('../utils/Error/index');

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
            
            var today = new Date();
            var future = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today <= currentDate);
            });

            var past = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today > currentDate)
            });

            const diagnosesList = await diagnoseQueries.getDiagnosesBySSN(SSN);
            
            return {
                patientSocialSecurityNumber: SSN,
                name: patient.name,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                vaccinationsList: {future, past},
                diagnosesList: diagnosesList
            }

        } catch (error) {
            throw error;
        }
        
    };

    //Insert patient

    async insertPatient(request) {
        
        try {
            var insertIntoPatientQuery = 'INSERT INTO patients(patientSocialSecurityNumber, name, gender, dateOfBirth) VALUES(?, ?, ?, ?)';

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

    //Delete patient from registration

    async deleteFromRegistrations(ID, SSN) {

        try {

            var findRegistrationQuery = "SELECT * FROM vaccineregistrations WHERE vaccinationId=? AND patientSocialSecurityNumber=?"
            var findRegistrationParameter = [
                ID,
                SSN
            ]

            const shiftsList = await dbQuery(findRegistrationQuery, findRegistrationParameter);
            if (!shiftsList[0]) {
                throw new newError({
                    error: 11012,
                    error_type: "This registration doesn't exist",
                    data:[]
                })
            }
            
            var findVaccinationQuery = "SELECT * FROM vaccinations WHERE vaccinationId=?"
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

            var deleteRegistrationQuery = 'DELETE FROM vaccineregistrations WHERE vaccinationId=? AND patientSocialSecurityNumber=?';
            var deleteRegistrationParameters = [
                ID,
                SSN
            ];
            
            const result = await dbQuery(deleteRegistrationQuery, deleteRegistrationParameters);
            
            return result;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = new PatientQueries;


