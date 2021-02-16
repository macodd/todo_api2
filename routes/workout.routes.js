// controller for todos list database
const controller = require("../controllers/workout.controller");
const authJwt = require("../middleware/authJwt");

// function to return workouts based on users id
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // all todoList
    app.get("/api/user/:userId/workout", [authJwt.verifyToken], controller.getWorkouts);

    // specific todoList
    app.get("/api/user/:userId/workout/:id", [authJwt.verifyToken], controller.getWorkoutByID);

    // create a todolist
    app.post("/api/user/:userId/workout/create", [authJwt.verifyToken], controller.createWorkout);

    // delete a specific todoList
    app.delete("/api/user/:userId/workout/:id/delete", [authJwt.verifyToken], controller.deleteWorkout);
}