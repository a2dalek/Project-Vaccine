
class MainpageController {

    // [GET]
    index(req, res) {
        res.json({
            error: 0
        });
    }
}

module.exports = new MainpageController;