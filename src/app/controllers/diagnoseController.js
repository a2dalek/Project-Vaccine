const Joi = require('joi');
const DiagnoseQueries = require("../DB/diagnoseQueries");

class DiagnosesController {

    // [GET] /all
    async all(req, res) {
        const results = await DiagnoseQueries.getAllDiagnoses();
        res.json({
            error: 0,
            error_msg: "All diagnoses",
            data: results
        })
    }

    // [GET] /?patientsocialsecuritynumber

    async getByPatientSocialSecurityNumber(req, res) {

        const requestBodySchema = Joi.object({
            patientsocialsecuritynumber: Joi.string().required(),
        });

        try {
            const validatedRequestBody = requestBodySchema.validate(req.query);
        } catch (error) {
            throw error;
        }

        const results = await DiagnoseQueries.getDiagnosesBySocialSecurityNumber(req.query.patientsocialsecuritynumber);
        res.json({
            error: 0,
            error_msg: "Diagnoses by patient social security number",
            data: results
        })
    }
}

module.exports = new DiagnosesController;