// controller for todos list database
const controller = require("../controllers/exercise.controller");
const authJwt = require("../middleware/authJwt");

// function to return items of a specific todolist
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // get a specific list item
    app.get('/api/user/:userId/workout/:workoutId/exercise/:id', [authJwt.verifyToken], controller.getExercise);

    // create a specific todoListItem into the specific list id
    app.post('/api/user/:userId/workout/:workoutId/create', [authJwt.verifyToken], controller.createExercise);

    // update data on specific todoListItem
    app.put('/api/user/:userId/workout/:workoutId/exercise/:id/update', [authJwt.verifyToken], controller.updateExercise);

    // delete todoListItem
    app.delete('/api/user/:userId/workout/:workoutId/exercise/:id/delete', [authJwt.verifyToken], controller.deleteExercise);
}