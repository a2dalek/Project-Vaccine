const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const StaffMemberQueries = require("../DB/staffMemberQueries");

class staffMemberController {

    // [GET] /all
    async all(req, res) {
        const results = await StaffMemberQueries.getAllStaffMembers();
        res.json({
            error: 0,
            msg: "All staff members",
            data: results
        })
    }

    // [DELETE] /delete?vaccinationid&staffMemberSocialSecurityNumber

    async deleteFromShift(req, res) {

        req.query.vaccinationid = parseInt(req.query.vaccinationid);
        console.log(req.query);
        const deleteFromShiftSchema = {
            type: "object",
            properties: {
                vaccinationid : {
                    type: "integer",
                },
                staffMemberSocialSecurityNumber : {
                    type: "string",
                }
            },
            required: ["vaccinationid", "staffMemberSocialSecurityNumber"]
        }

        const valid = ajv.validate(deleteFromShiftSchema, req.query);
        if (!valid) {
            res.json({
                error: 10051,
                error_type: "Invalid delete staff member from shifts body",
                data: ajv.errors
            })
            return;
        }

        try {
            const results = await StaffMemberQueries.deleteFromShifts(req.query.vaccinationid, req.query.staffMemberSocialSecurityNumber);
            res.json({
                error: 0,
                msg: "Delete shift successfully",
                data: results
            })
        } catch (error) {
            res.json(error)
        }  
    }

}

module.exports = new staffMemberController;