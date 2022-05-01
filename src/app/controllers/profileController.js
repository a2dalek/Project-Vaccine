const patientQueries = require("../DB/patientQueries");
const staffMemberQueries = require("../DB/staffMemberQueries");

class ProfileController {
    
    // [GET]/
    async getProfileBySSN(req, res) {
        
        var results;
        if (req.user.userType == 'user') {
            results = await patientQueries.getPatientBySSN(req.param('SSN'));
        } else {
            results = await staffMemberQueries.getStaffMemberBySocialSecurityNumber(req.param('SSN'));
        }

        res.json({
            error: 0,
            msg: "user profile",
            data: results
        });
    }
}

module.exports = new ProfileController;
