const { string } = require("joi");
const patientMemberQueries = require("../DB/patientQueries");

class PatientsController {

    // [GET] /all
    async all(req, res) {
        const results = await patientMemberQueries.getAllPatients();
        res.json({
            error: 0,
            error_msg: "Vaccinations",
            data: results
        })
    }

    // [GET] /:socialsecuritynumber
    async getBySocialSecurityNumber(req, res) {
        const results = await patientMemberQueries.getPatientBySocialSecurityNumber(req.param('socialsecuritynumber'));
        res.json({
            error: 0,
            error_msg: "Vaccination by index",
            data: results
        })
    }
}

module.exports = new PatientsController;