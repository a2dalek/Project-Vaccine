const patientQueries = require("../DB/patientQueries");

class userController {
    // [GET]/
    async getUser(req, res) {
        const tempResults = await patientQueries.getPatientByToken(req);
        console.log(tempResults.patientSocialSecurityNumber);
        const results = await patientQueries
            .getPatientBySocialSecurityNumber(tempResults.patientSocialSecurityNumber);
        res.json({
            data: results
        });
    }
}

module.exports = new userController;
