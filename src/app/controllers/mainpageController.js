
class MainpageController {

    // [GET]
    index(req, res) {
        res.json({
            error: 0,
            error_msg: "main page"
        });
    }
}

module.exports = new MainpageController;