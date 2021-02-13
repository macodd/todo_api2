const controller = require("../controllers/auth.controller");

// function to control headers and login authentication
module.exports = function (app) {
    app.use(function (req, res, next) {
       res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept"
       );
       next();
    });

    // login endpoint
    app.post("/api/auth/login", controller.login);
}