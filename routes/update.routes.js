const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/update.controller");

module.exports = function (app) {
    // function to control headers and login authentication
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // endpoint for first time address input
    app.put("/api/user/:userId/address/update", [authJwt.verifyToken], controller.updateAddress);

    // endpoint for first time goal input
    app.put("/api/user/:userId/goal/update", [authJwt.verifyToken], controller.updateGoal);

}
