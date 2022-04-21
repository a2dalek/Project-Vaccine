const { string } = require("joi");
const vaccinationsQuery = require("../DB/vaccinationsQuery");

class VaccinationsController {

    // [GET] /
    async all(req, res) {
        const results = await vaccinationsQuery.getAllVaccinations();
        res.json({
            error: 0,
            error_msg: "Vaccinations",
            data: results
        })
    }

    // [GET] /:index
    async getByIndex(req, res) {
        const results = await vaccinationsQuery.getVaccinationByIndex();
        res.json({
            error: 0,
            error_msg: "Vaccination by index",
            data: results
        })
    }
}

module.exports = new VaccinationsController;