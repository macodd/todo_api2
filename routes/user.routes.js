const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // all access endpoint (anon)
    app.get("/api/all", controller.anonBoard);

    // logged in user access (user)
    app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

    // get all todos associated with the userId
    app.get("/api/user/:userId", [authJwt.verifyToken], controller.getUserTodos);

}