const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/new-user.controller");

// function to control headers and login authentication

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/user/:userID/newUserAddress", [authJwt.verifyToken], controller.newUserAddress);

    app.post("/api/user/:userId/newUserGoal", [authJwt.verifyToken], controller.newUserGoal);

}
