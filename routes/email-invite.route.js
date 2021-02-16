const controller = require("../controllers/invite.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // email invite endpoint
    app.post("/api/user/:userId/invite", [authJwt.verifyToken], controller.invite);
}