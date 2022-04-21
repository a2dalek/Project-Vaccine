const vaccinationsQuery = require("../DB/vaccinationsQuery");

class VaccinationsController {

    // [GET] /
    async index(req, res) {
        const results = await vaccinationsQuery.getAllVaccinations();
        res.json({
            error: 0,
            error_msg: "Vaccinations",
            data: results
        })
    }
}

module.exports = new VaccinationsController;