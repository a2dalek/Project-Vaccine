
class HomepageController {

    // [GET]
    index(req, res) {
        res.json({
            error: 0,
            msg: "homepage",
            data:[]
        });
    }
}

module.exports = new HomepageController;