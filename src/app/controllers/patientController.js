const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const patientQueries = require("../DB/patientQueries");

class PatientsController {

    // [GET] /all
    async all(req, res) {
        const results = await patientQueries.getAllPatients();
        res.json({
            error: 0,
            msg: "All patients",
            data: results
        })
    }

    // // [GET] /:SSN
    // async getBySSN(req, res) {
    //     const results = await patientQueries.getPatientBySSN(req.param('SSN'));
    //     res.json({
    //         error: 0,
    //         error_msg: "Vaccination by index",
    //         data: results
    //     })
    // }

    // [DELETE] /delete?vaccinationid&patientSocialSecurityNumber

    async deleteFromRegistration(req, res) {

        const deleteFromRegistrationSchema = {
            type: "object",
            properties: {
                vaccinationid : {
                    type: "string",
                },
                patientSocialSecurityNumber : {
                    type: "string",
                }
            },
            required: ["vaccinationid", "patientSocialSecurityNumber"]
        }

        const valid = ajv.validate(deleteFromRegistrationSchema, req.query);
        if (!valid) {
            res.json({
                error: 10051,
                error_type: "Invalid delete patient from registration body",
                data: ajv.errors
            })
            return;
        }

        try {
            const results = await patientQueries.deleteFromRegistrations(req.query.vaccinationid, req.query.patientSocialSecurityNumber);
            res.json({
                error: 0,
                msg: "Delete registration successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }
}

module.exports = new PatientsController;