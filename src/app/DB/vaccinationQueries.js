const dbQuery = require('./ultis');
const mysql = require('mysql');
const vaccineStationQueries = require('./vaccineStationQueries');
const staffMemberQueries = require('./staffMemberQueries');
const patientQueries = require('./patientQueries');
const newError = require('../utils/Error/index');

class VaccinationsQueries {

    //Find all vaccinations

    async getAllVaccinations() {

        //TODO: add validation

        var getAllVaccinationsQuery = 'SELECT vaccinationID, name, vaccineStations.address AS address, limitNumber, date, vaccineType \
                                       FROM vaccinations \
                                       LEFT JOIN vaccineStations \
                                       ON vaccinations.vaccineStationId=vaccineStations.vaccineStationId';
             
        try {
            const vaccinationsList = await dbQuery(getAllVaccinationsQuery);
            var today = new Date();
            var future = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today <= currentDate);
            });

            var past = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today > currentDate)
            });

            return {future, past};
        } catch (error) {
            throw error;
        }
        
    };

    //Find all vaccinations

    async getAllVaccinationsForUser(SSN) {

        //TODO: add validation

        var getAllVaccinationsQuery = 'SELECT vaccinationID, name, vaccineStations.address AS address, limitNumber, date, vaccineType \
                                       FROM vaccinations \
                                       LEFT JOIN vaccineStations \
                                       ON vaccinations.vaccineStationId=vaccineStations.vaccineStationId';
             
        try {
            const vaccinationsList = await dbQuery(getAllVaccinationsQuery);
            var today = new Date();
            var future = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today <= currentDate);
            });

            var past = vaccinationsList.filter(vaccination => {
                var currentDate = new Date(vaccination.date);
                return (today > currentDate)
            });
            
            var getVaccinationsByPatientSSN = 
            'SELECT vaccinations.vaccinationID AS vaccinationID\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN vaccineregistrations\
            ON vaccineregistrations.vaccinationID=vaccinations.vaccinationID\
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(SSN);
                                                       
            const userVaccinationsList = await dbQuery(getVaccinationsByPatientSSN);
            
            var assigned = future.filter(vaccination => {
                var ok = false;
                userVaccinationsList.forEach(userVaccination => {
                    if (vaccination.vaccinationID == userVaccination.vaccinationID) {
                        ok = true;
                    }
                });
                return ok;
            });

            var notAssigned = future.filter(vaccination => {
                var ok = false;
                userVaccinationsList.forEach(userVaccination => {
                    if (vaccination.vaccinationID == userVaccination.vaccinationID) {
                        ok = true;
                    }
                });
                return (!ok);
            });
            console.log(userVaccinationsList);
            return {assigned, notAssigned, past};
        } catch (error) {
            throw error;
        }
        
    };


    //Find vaccination by id

    async getVaccinationByID(Id) {

        //TODO: add validation

        var getVaccinationByIdQuery = 'SELECT * \
                                  FROM vaccinations \
                                  WHERE vaccinationID=' + mysql.escape(Id);
             
        try {
            const vaccinationList = await dbQuery(getVaccinationByIdQuery);
            if (!vaccinationList[0]) {
                throw new newError({
                    error: 10020,
                    error_type: "This vaccination does not exist",
                    data:[]
                })
            }
            const vaccination = vaccinationList[0];
            
            const vaccineStation = await vaccineStationQueries.getVaccineStationByID(vaccination.vaccineStationId);
            const staffMemberList = await staffMemberQueries.getStaffMembersByVaccinationId(Id);
            const patientList = await patientQueries.getPatientsByVaccinationId(Id);
            
            return {
                vaccinationID: Id,
                vaccineStation: vaccineStation,
                limitNumber: vaccination.limitNumber,
                date: vaccination.date,
                vaccineType: vaccination.vaccineType,
                staffMembersList: staffMemberList,
                patientsList: patientList
            }

        } catch (error) {
            throw error;
        }
        
    };

    // Find vaccinations by staff member social security number

    async getVaccinationsByStaffMemberSocialSecurityNumber(socialSecurityNumber) {

        //TODO: add validation

        try {
            var getVaccinationsByStaffMemberSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN shifts\
            ON shifts.vaccinationID=vaccinations.vaccinationID\
            AND shifts.staffMemberSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const results = await dbQuery(getVaccinationsByStaffMemberSocialSecurityNumberQuery);

            return results;
        } catch (error) {
            throw error;
        }
        
    };

    // Find vaccinations by staff member social security number

    async getVaccinationsByPatientSocialSecurityNumber(socialSecurityNumber) {

        //TODO: add validation

        try {
            var getVaccinationsByPatientSocialSecurityNumberQuery = 
            'SELECT vaccinations.vaccinationID, vaccinestations.name, vaccinations.limitNumber, vaccinations.date, vaccinations.vaccineType\
            FROM vaccinations\
            INNER JOIN vaccinestations\
            ON vaccinations.vaccineStationId = vaccinestations.vaccineStationId\
            INNER JOIN vaccineregistrations\
            ON vaccineregistrations.vaccinationID=vaccinations.vaccinationID\
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const results = await dbQuery(getVaccinationsByPatientSocialSecurityNumberQuery);
            
            return results;
        } catch (error) {
            throw error;
        }
        
    };

    //Insert vaccination

    async insertVaccination(insertValue) {

        try {

            var findVaccinationQuery = "SELECT vaccinationID FROM vaccinations WHERE vaccineStationId=? AND date=?"
            var findVaccinationParameter = [
                insertValue.vaccineStationId,
                insertValue.date
            ]

            const vaccinationsList = await dbQuery(findVaccinationQuery, findVaccinationParameter);
            if (vaccinationsList[0]) {
                throw new newError({
                    error: 10019,
                    error_type: "Already had vaccination in the same station in the same day",
                    data:[]
                })
            }

            var insertVaccinationQuery = 'INSERT INTO vaccine.vaccinations(vaccineStationId, limitNumber, date, vaccineType) VALUES(?, ?, ?, ?)';
            var parameters = [
                insertValue.vaccineStationId,
                insertValue.limitNumber,
                insertValue.date,
                insertValue.vaccineType
            ];

            const vaccination = await dbQuery(insertVaccinationQuery, parameters);
            return vaccination;
        } catch (error) {
            throw error;
        }
    };

    //Add staff member into vaccination

    async addStaffMemberIntoVaccination(insertValue) {

        try {

            const vaccination = await this.getVaccinationByID(insertValue.vaccinationID);

            var today = new Date();
            var queryDay = new Date(vaccination.date);

            if (today >= queryDay) {
                throw new newError({
                    error: 10021,
                    error_type: "Can't assign staff member to vaccination in the past",
                    data: []
                })
            }

            var findShiftQuery = 
            "SELECT * FROM shifts WHERE staffMemberSocialSecurityNumber=? AND vaccinationID IN \
                (SELECT vaccinationID FROM vaccinations WHERE date=?)";

            var findShiftParameter = [
                insertValue.SSN,
                queryDay
            ]

            const shiftList = await dbQuery(findShiftQuery, findShiftParameter);
            if (shiftList[0]) {
                throw new newError({
                    error: 10022,
                    error_type: "This staff member will take part in other vaccination in the same day",
                    data:[]
                })
            }

            var insertShiftQuery = 'INSERT INTO vaccine.shifts(staffMemberSocialSecurityNumber, vaccinationID) VALUES(?, ?)';
            var parameters = [
                insertValue.SSN,
                insertValue.vaccinationID,
            ];

            const shift = await dbQuery(insertShiftQuery, parameters);
            return shift;
        } catch (error) {
            throw error;
        }
    };

    //Add patient into vaccination

    async assignPatientToVaccination(insertValue) {

        try {

            const vaccination = await this.getVaccinationByID(insertValue.vaccinationID);

            var today = new Date();
            var queryDay = new Date(vaccination.date);

            if (today >= queryDay) {
                throw new newError({
                    error: 10021,
                    error_type: "Can't assign patient to vaccination in the past",
                    data: []
                })
            }

            const numberAssigned = Object.keys(vaccination.patientsList).length;

            if (numberAssigned >= vaccination.limitNumber) {
                throw new newError({
                    error: 10029,
                    error_type: "Out of limit",
                    data: []
                })
            }
            
            const patient = await patientQueries.getPatientBySSN(insertValue.SSN);

            const isDangerous = patient.diagnosesList.filter(function(diagnoses) { return diagnoses.criticality === '1'}).length;
            if (isDangerous > 0) {
                throw new newError({
                    error: 10030,
                    error_type: "Having dangerous symptoms",
                    data: []
                })
            }

            
            var dateDiffQuery = 
            "SELECT MAX(DATEDIFF(?,date)) AS dateDiff FROM vaccinations WHERE vaccinationID IN \
               (SELECT vaccinationID FROM vaccineregistrations WHERE patientSocialSecurityNumber=?)";

            var dateDiffParameter = [
                vaccination.date,
                insertValue.SSN,
            ]

            const dateDiff = await dbQuery(dateDiffQuery, dateDiffParameter);

            if (dateDiff[0] && dateDiff[0].dateDiff <= 60) {
                throw new newError({
                    error: 10032,
                    error_type: "Time between two vaccinations must be longer than 60 days",
                    data:[]
                })
            }

            var insertVaccineRegistrationsQuery = 'INSERT INTO vaccine.vaccineregistrations(patientSocialSecurityNumber, vaccinationID) VALUES(?, ?)';
            var parameters = [
                insertValue.SSN,
                insertValue.vaccinationID,
            ];

            const vaccineRegistrations = await dbQuery(insertVaccineRegistrationsQuery, parameters);
            return vaccineRegistrations;
        } catch (error) {
            throw error;
        }
    };

    //Add patient into vaccination

    async assignPatientToVaccination(insertValue) {

        try {

            const vaccination = await this.getVaccinationByID(insertValue.vaccinationID);

            var today = new Date();
            var queryDay = new Date(vaccination.date);

            if (today >= queryDay) {
                throw new newError({
                    error: 10021,
                    error_type: "Can't assign patient to vaccination in the past",
                    data: []
                })
            }

            const numberAssigned = Object.keys(vaccination.patientsList).length;

            if (numberAssigned >= vaccination.limitNumber) {
                throw new newError({
                    error: 10029,
                    error_type: "Out of limit",
                    data: []
                })
            }
            
            const patient = await patientQueries.getPatientBySSN(insertValue.SSN);

            const isDangerous = patient.diagnosesList.filter(function(diagnoses) { return diagnoses.criticality === '1'}).length;
            if (isDangerous > 0) {
                throw new newError({
                    error: 10030,
                    error_type: "Having dangerous symptoms",
                    data: []
                })
            }

            
            var dateDiffQuery = 
            "SELECT MAX(DATEDIFF(?,date)) AS dateDiff FROM vaccinations WHERE vaccinationID IN \
               (SELECT vaccinationID FROM vaccineregistrations WHERE patientSocialSecurityNumber=?)";

            var dateDiffParameter = [
                vaccination.date,
                insertValue.SSN,
            ]

            const dateDiff = await dbQuery(dateDiffQuery, dateDiffParameter);

            if (dateDiff[0] && dateDiff[0].dateDiff <= 60) {
                throw new newError({
                    error: 10032,
                    error_type: "Time between two vaccinations must be longer than 60 days",
                    data:[]
                })
            }

            var insertVaccineRegistrationsQuery = 'INSERT INTO vaccine.vaccineregistrations(patientSocialSecurityNumber, vaccinationID) VALUES(?, ?)';
            var parameters = [
                insertValue.SSN,
                insertValue.vaccinationID,
            ];

            const vaccineRegistrations = await dbQuery(insertVaccineRegistrationsQuery, parameters);
            return vaccineRegistrations;
        } catch (error) {
            throw error;
        }
    };

    //Delete vaccination

    async deleteVaccinationByID(ID) {

        try {

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
            var currentDate = new Date(vaccination.date)
            if (today > currentDate) {
                throw new newError({
                    error: 11008,
                    error_type: "Can not delete a vaccination in the past",
                    data:[]
                })
            }

            var deleteShiftQuery = 'DELETE FROM shifts WHERE vaccinationID=?';
            var deleteShiftQueryParameters = [
                ID
            ];
            await dbQuery(deleteShiftQuery, deleteShiftQueryParameters);

            var deleteVaccineRegistrationsQuery = 'DELETE FROM vaccineregistrations WHERE vaccinationID=?';
            var deleteVaccineRegistrationsQueryParameters = [
                ID
            ];
            await dbQuery(deleteVaccineRegistrationsQuery, deleteVaccineRegistrationsQueryParameters);

            var deleteVaccinationQuery = 'DELETE FROM vaccinations WHERE vaccinationID=?';
            var parameters = [
                ID
            ];

            const result = await dbQuery(deleteVaccinationQuery, parameters);
            return result;
        } catch (error) {
            throw error;
        }
    };

    //Delete vaccination

    async getStaffList(ID) {

        try {

            var getVaccinationByIdQuery = 'SELECT * \
                                  FROM vaccinations \
                                  WHERE vaccinationID=' + mysql.escape(ID);
             
            const vaccinationList = await dbQuery(getVaccinationByIdQuery);
            if (!vaccinationList[0]) {
                throw new newError({
                    error: 10020,
                    error_type: "This vaccination does not exist",
                    data:[]
                })
            }
            const vaccination = vaccinationList[0];

            const staffMemberList = await staffMemberQueries.getStaffMembersByVaccinationId(ID);
            const freeMemberList = await staffMemberQueries.getFreeStaffMembers(vaccination.date);
            
            return {staffMemberList, freeMemberList};
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new VaccinationsQueries;
