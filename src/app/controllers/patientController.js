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
}

module.exports = new PatientsController;