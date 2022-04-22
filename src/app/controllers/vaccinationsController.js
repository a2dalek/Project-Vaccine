const { string } = require("joi");
const vaccinationsQuery = require("../DB/vaccinationQueries");

class VaccinationsController {

    // [GET] /all
    async all(req, res) {
        const results = await vaccinationsQuery.getAllVaccinations();
        res.json({
            error: 0,
            error_msg: "Vaccinations",
            data: results
        })
    }

    // [GET] /:ID
    async getByID(req, res) {
        const results = await vaccinationsQuery.getVaccinationByID(req.param('ID'));
        res.json({
            error: 0,
            error_msg: "Vaccination by index",
            data: results
        })
    }
}

module.exports = new VaccinationsController;