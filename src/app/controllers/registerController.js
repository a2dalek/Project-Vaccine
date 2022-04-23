const patientQueries = require("../DB/patientQueries");

class registerController {
    // [POST]/
    async register(req, res) {
        const results = await patientQueries.insertPatient(req);
       // console.log(req);
        res.json({
            msg: results
        });
    }
}

module.exports = new registerController;