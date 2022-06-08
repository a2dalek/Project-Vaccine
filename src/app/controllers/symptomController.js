const symptomQueries = require("../DB/symptomQueries");

class SymptomController {
    
    // [GET]/
    async getAll(req, res) {
        
        var results = await symptomQueries.getAll();

        res.json({
            error: 0,
            msg: "All symptoms",
            data: results
        });
    }
}

module.exports = new SymptomController;
