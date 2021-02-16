const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");

// function to control headers and login authentication
module.exports = function (app) {
    app.use(function (req, res, next) {
       res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept"
       );
       next();
    });

    // signup endpoint
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.duplicateEmail,
            verifySignUp.roleExists
        ],
        controller.signup
    );

    // login endpoint
    app.post("/api/auth/login", controller.login);
}