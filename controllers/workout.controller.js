// database models
const db = require("../models");

// workout model
const Workout = db.workout;

// returns all the todoLists for a specific user
exports.getWorkouts = function (req, res) {
    Workout.findAll({
        where: {
            userId: req.params.userId
        }
    })
    .then((workouts) => {
        res.status(200).json(workouts);
    });
};

// returns a specific todoList for a specific user
exports.getWorkoutByID = function (req, res) {
    Workout.findOne({
        where: {
            userId: req.params.userId,
            id: req.params.id
        },
        include: db.exercise
    })
    .then((workout) => {
        res.status(200).json(workout);
    });
};

// Creates a new todoList in the database
exports.createWorkout = function (req, res) {
    Workout.create({
        name: req.body.name,
        date: req.body.date,
        userId: req.params.userId
    })
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({
        message: err.message
    }));
};

// Deletes a existing todoList from the database
exports.deleteWorkout = function (req, res) {
    Workout.findOne({
        where: {
            userId: req.params.userId,
                id: req.params.id
        }
    })
    .then(workout => {
        if (workout == null) {
            res.status(404).json({
                message: "Not Found"
            });
        }
        else {
            workout.destroy().then(() => {
                res.status(200).json({
                    message : `item ${req.params.id} deleted`})
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}