const Joi = require('joi');
const StaffMemberQueries = require("../DB/staffMemberQueries");

class staffMemberController {

    // [GET] /all
    async all(req, res) {
        const results = await StaffMemberQueries.getAllStaffMembers();
        res.json({
            error: 0,
            error_msg: "All staff members",
            data: results
        })
    }

    // [GET] /staffmember?vaccinationId
    
    async getByVaccinationId(req, res) {
        
        const requestBodySchema = Joi.object({
            vaccinationId: Joi.number().required(),
        });

        try {
            const validatedRequestBody = requestBodySchema.validate(req.query);
        } catch (error) {
            throw error;
        }

        const results = await StaffMemberQueries.getStaffMembersByVaccinationId(req.query.vaccinationId);
        res.json({
            error: 0,
            error_msg: "Staff members by vaccinationId",
            data: results
        })
    }

    // [GET] :socialsecuritynumber
    async getBySocialSecurityNumber(req, res) {
        
        const results = await StaffMemberQueries.getStaffMemberBySocialSecurityNumber(req.param('socialsecuritynumber'));
        res.json({
            error: 0,
            error_msg: "Staff member by social security number",
            data: results
        })
    }

}

module.exports = new staffMemberController;