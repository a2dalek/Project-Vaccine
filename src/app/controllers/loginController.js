const patientQueries = require("../DB/patientQueries");

class loginController {
    // [POST]/
    async login(req, res) {
        const results = await patientQueries.login(req);
        //console.log(req);
        res.json({
            msg: results
        });
    }
}

module.exports = new loginController;