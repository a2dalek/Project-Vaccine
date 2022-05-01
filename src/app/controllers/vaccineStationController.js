const Ajv = require("ajv");
const ajv = new Ajv();
const vaccineStationQueries = require("../DB/vaccineStationQueries");

class VaccineStationsController {

    // [GET] /all
    async all(req, res) {
        const results = await vaccineStationQueries.getAllVaccineStations();
        res.json({
            error: 0,
            msg: "All vaccine stations",
            data: results,
        })
    }

    // [GET] /:id
    async getByID(req, res) {

        //TODO: add validation

        const results = await vaccineStationQueries.getVaccineStationByID(req.param('ID'));
        res.json({
            error: 0,
            msg: "Vaccine station by id",
            data: results
        })
    }

    // [POST] /new
    async insertVaccineStation(req, res) {

        const InsertVaccineStationSchema = {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                }
            },
            required: ["name", "phone", "address"]
        }

        const valid = ajv.validate(InsertVaccineStationSchema, req.body);
        if (!valid) {
            res.json({
                error: 10016,
                error_type: "Invalid insert station request body",
                data: ajv.errors
            })
            return;
        }

        const results = await vaccineStationQueries.insertVaccineStations(req.body);
        res.json({
            error: 0,
            msg: "Insert successfully",
            data: results
        })
    }
}

module.exports = new VaccineStationsController;