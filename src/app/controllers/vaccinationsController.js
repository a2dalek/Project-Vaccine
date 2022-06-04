const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const vaccinationsQuery = require("../DB/vaccinationQueries");

class VaccinationsController {

    // [GET] /all
    async all(req, res) {
        var role = req.user.userType;
        if (role == 'user') {
            const results = await vaccinationsQuery.getAllVaccinationsForUser(req.user.SSN);
            res.json({
                error: 0,
                error_msg: "All vaccinations",
                data: results
            })
            return;
        }

        const results = await vaccinationsQuery.getAllVaccinations();
        res.json({
            error: 0,
            error_msg: "All vaccinations",
            data: results
        })
    }

    // [GET] /:ID
    async getByID(req, res) {

        //TODO: add validation
        
        const results = await vaccinationsQuery.getVaccinationByID(req.param('ID'));
        res.json({
            error: 0,
            error_msg: "Vaccination by id",
            data: results
        })
    }

    // [POST] /new

    async insert(req, res) {

        const InsertVaccinationSchema = {
            type: "object",
            properties: {
                vaccineStationId : {
                    type: "number",
                    minimum: 1
                },
                limitNumber: {
                    type: "number",
                    minimum: 100,
                    maximum: 500,
                },
                date: {
                    type: "string",
                    format: "date",
                },
                vaccineType: {
                    type: "string",
                    enum: ["AstraZeneca", "Moderna", "Comirnaty"]
                }
            },
            required: ["vaccineStationId", "limitNumber", "date", "vaccineType"]
        }

        const valid = ajv.validate(InsertVaccinationSchema, req.body);
        if (!valid) {
            res.json({
                error: 10016,
                error_type: "Invalid insert vaccination request body",
                data: ajv.errors
            })
            return;
        }

        var today = new Date();
        var queryDay = new Date(req.body.date);
        
        if (today >= queryDay) {
            res.json({
                error: 10017,
                error_type: "Vaccination's date must be in future",
                data: []
            })
            return;
        }

        try {
            const results = await vaccinationsQuery.insertVaccination(req.body);
            res.json({
                error: 0,
                msg: "Insert successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }

    // [POST] /:ID/add

    async addStaffMember(req, res) {

        const requestBody = {
            SSN: req.body.SSN,
            vaccinationID: parseInt(req.param('ID'), 10)
        }

        const addStaffMemberSchema = {
            type: "object",
            properties: {
                SSN : {
                    type: "string"
                },
                vaccinationID: {
                    type: "number",
                    minimum: 1
                },
            },
            required: ["SSN", "vaccinationID"]
        }

        const valid = ajv.validate(addStaffMemberSchema, requestBody);
        if (!valid) {
            res.json({
                error: 10016,
                error_type: "Invalid add staff member into vaccination request body",
                data: ajv.errors
            })
            return;
        }

        try {
            const results = await vaccinationsQuery.addStaffMemberIntoVaccination(requestBody);
            res.json({
                error: 0,
                msg: "Add staff member to vaccination successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }

    // [POST] /assign

    async assign(req, res) {

        const assignSchema = {
            type: "object",
            properties: {
                SSN : {
                    type: "string"
                },
                vaccinationID: {
                    type: "number",
                    minimum: 1
                },
            },
            required: ["SSN", "vaccinationID"]
        }

        const valid = ajv.validate(assignSchema, req.body);
        if (!valid) {
            res.json({
                error: 10023,
                error_type: "Invalid assign request body",
                data: ajv.errors
            })
            return;
        }

        try {
            const results = await vaccinationsQuery.assignPatientToVaccination(req.body);
            res.json({
                error: 0,
                msg: "Assign patient to vaccination successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }

    // [DELETE] /delete?vaccinationid

    async deleteVaccinationById(req, res) {

        const deleteVaccinationByIDSchema = {
            type: "object",
            properties: {
                vaccinationid : {
                    type: "string",
                }
            },
            required: ["vaccinationid"]
        }

        const valid = ajv.validate(deleteVaccinationByIDSchema, req.query);
        if (!valid) {
            res.json({
                error: 10051,
                error_type: "Invalid delete vaccination by ID body",
                data: ajv.errors
            })
            return;
        }

        try {
            const results = await vaccinationsQuery.deleteVaccinationByID(req.query.vaccinationid);
            res.json({
                error: 0,
                msg: "Delete vaccination successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }
}

module.exports = new VaccinationsController;