const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

// function to control user views
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // all access endpoint (all)
    app.get("/api/all", controller.allAccessBoard);

    // logged in user access (user)
    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    // logged in trainer access
    app.get(
        "/api/trainer",
        [authJwt.verifyToken, authJwt.isTrainer],
        controller.trainerBoard
    );

    // logged in admin access
    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    // get all todos associated with the userId
    app.get("/api/user/:userId", [authJwt.verifyToken], controller.getUserTodos);

}