const { func } = require('joi');
const Joi = require('joi');
const dbQuery = require('./ultis');
const vaccinationQueries = require('./vaccinationQueries');
const diagnoseQueries = require('./diagnoseQueries');
const mysql = require('mysql');
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const DB = require('../DB/DBconnect');
const {compareSync} = require("bcrypt");
const jwt = require('jsonwebtoken');

class PatientQueries {

    // Find patients by vaccinationId
    
    async getPatientsByVaccinationId(vaccinationID) {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getPatientsByVaccinationQuery = 'SELECT patients.patientSocialSecurityNumber,  \
                                       patients.name, patients.gender, patients.dateOfBirth \
                                       FROM vaccineregistrations \
                                        INNER JOIN patients \
                                       ON patients.patientSocialSecurityNumber=vaccineregistrations.patientSocialSecurityNumber \
                                       AND vaccineregistrations.vaccinationID=' + mysql.escape(vaccinationID);
        try {
            const results = await dbQuery(getPatientsByVaccinationQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };

    // Find all patients
    
    async getAllPatients() {

        // const responseBodySchema = Joi.array().items({
        //     staffMember: Joi.object({
        //         staffMemberSocialSecurityNumber: Joi.string().required(),
        //         name: Joi.string().required(),
        //         dateOfBirth: Joi.date(),
        //         phone: Joi.string(),
        //         role: Joi.string().required()
        //     })
        // })

        var getAllPatientsQuery = 'SELECT * FROM patients';

        try {
            const results = await dbQuery(getAllPatientsQuery);
            return results;
        } catch (error) {
            throw error;
        }
        
    };


    //Find patient by social security number

    async getPatientBySocialSecurityNumber(socialSecurityNumber) {

        // const responseBodySchema = Joi.array().items({
        //     vaccination: Joi.object({
        //         vaccinationID: Joi.number().required(),
        //         vaccineStation: Joi.string().required(),
        //         limitNumber: Joi.number().required(),
        //         date: Joi.date().required(),
        //         vaccineType: Joi.string().required()
        //     })
        // })

        var getPatientBySocialSecurityNumberQuery = 'SELECT * \
                                  FROM patients \
                                  WHERE patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
             
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
            AND vaccineregistrations.patientSocialSecurityNumber=' + mysql.escape(socialSecurityNumber);
                                                       
            const vaccinationsList = await dbQuery(getVaccinationsByPatientSocialSecurityNumberQuery);

            const diagnosesList = await diagnoseQueries.getDiagnosesBySocialSecurityNumber(socialSecurityNumber);

            return {
                patientSocialSecurityNumber: socialSecurityNumber,
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

    //insert patient
    async insertPatient(request) {
        const error = validationResult(request);

        if (!error.isEmpty()) {
            return {
                message: error.array()
            };
        }
        try {
            var getSSN = 'SELECT patientSocialSecurityNumber FROM patients\
                            WHERE patientSocialSecurityNumber =' + mysql.escape(request.body.SSN);
            const row = await dbQuery(getSSN);

             if (row[0]) {
                return {
                    message: "The SSN already in use"
                };
             }
            const hashPass = await bcrypt.hash(request.body.password, 12);

            const amount = await dbQuery('SELECT COUNT(accountID) FROM account');

        //    var insertIntoAccount = 'INSERT INTO vaccine.account(accountID, socialSecurityNumber, password, userType) VALUES(?, ?, ?, ?)';
            var insertIntoPatient = 'INSERT INTO vaccine.patients(patientSocialSecurityNumber, name, gender, dateOfBirth) VALUES(?, ?, ?, ?)';

            const patient = await DB.DBcon.query(insertIntoPatient, [
                request.body.SSN,
                request.body.name,
                request.body.gender,
                request.body.dateOfBirth
            ]);

        //    console.log(amount);
        /*    const account = await DB.DBcon.query(insertIntoAccount, [
                amount[0] + 1,
                request.body.SSN,
                hashPass,
                'patient'
            ]);*/


            return  {
                message: "Successfully insert"
            };


        } catch (error) {
            throw error;
        }

    }

    async login(request) {
        const error = validationResult(request);

        if (!error.isEmpty()) {
            return {
                message: error.array()
            };
        }

        try {
            var getEmail = 'SELECT * FROM patients WHERE patientSocialSecurityNumber = ' + mysql.escape(request.body.SSN);
            const [row] = await dbQuery(getEmail);

            if (!row) {
                return {
                    message: "Invalid email address"
                };
            }

            /*const passMatch = await bcrypt.compare(request.body.password, row.password);
            if(!passMatch){
                return {
                    message: "Incorrect password",
                };
            }*/
            console.log(row);
           const accessToken = jwt.sign({
               patientSocialSecurityNumber:row.patientSocialSecurityNumber,
               name:row.name,
               gender:row.gender,
               dateOfBirth:row.dateOfBirth},
               'Databaseissofuckinez');

            return {
                token: accessToken
            };

        }catch(err){
            throw(err);
        }
    }

    async getPatientByToken(req) {
        //console.log(req);
        try{

            if(!req.body.token){
                return {
                    message: "Please provide the token",
                };
            }

            const accessToken = req.body.token;
            const decoded = jwt.verify(accessToken, 'Databaseissofuckinez');
            //console.log(decoded.patientSocialSecurityNumber);
            return decoded;
        }
        catch(err){
            throw(err);
        }
    }

}

module.exports = new PatientQueries;


