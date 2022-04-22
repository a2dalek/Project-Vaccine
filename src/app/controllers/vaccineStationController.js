const { string } = require("joi");
const vaccineStationQueries = require("../DB/vaccineStationQueries");

class VaccineStationsController {

    // [GET] /
    // async all(req, res) {
    //     const results = await vaccinationsQuery.getAllVaccinations();
    //     res.json({
    //         error: 0,
    //         error_msg: "Vaccinations",
    //         data: results
    //     })
    // }

    // [GET] /:id
    async getByID(req, res) {
        const results = await vaccineStationQueries.getVaccineStationByID(req.param('ID'));
        res.json({
            error: 0,
            error_msg: "VaccineStation by id",
            data: results
        })
    }
}

module.exports = new VaccineStationsController;