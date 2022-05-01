const Joi = require('joi');
const DiagnoseQueries = require("../DB/diagnoseQueries");

class DiagnosesController {

    // [GET] /all

    async all(req, res) {
        const results = await DiagnoseQueries.getAllDiagnoses();
        res.json({
            error: 0,
            msg: "All diagnoses",
            data: results
        })
    }

    // // [GET] /?SSN

    // async getByPatientSocialSecurityNumber(req, res) {

    //     // Add validation

    //     const results = await DiagnoseQueries.getDiagnosesBySocialSecurityNumber(req.query.SSN);
    //     res.json({
    //         error: 0,
    //         error_msg: "Diagnoses by patient social security number",
    //         data: results
    //     })
    // }
}

module.exports = new DiagnosesController;
