// database models
const db = require("../models");

const Exercise = db.exercise;

// get a specific list item
exports.getExercise = function (req, res) {
    Exercise.findOne({
        where: {
            workoutId: req.params.workoutId,
            id: req.params.id
        }
    })
    .then((exercise) => {

        console.log(exercise);

        if (exercise == null) {
            res.status(404).json({"error" : "Not Found" });
        } else {
            res.status(200).json(exercise);
        }
    });
};

// create a specific todoListItem into the specific list id
exports.createExercise = function (req, res) {
    db.workout.findOne({
        where: {
            userId: req.params.userId,
            id: req.params.workoutId
        }
    })
    .then((workout) => {
        if (workout == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            Exercise.create({
                name: req.body.name,
                targetWeight: req.body.targetWeight,
                done: false,
                workoutId: workout.id
            })
            .then(
                exercise => res.status(200).json(exercise)
            );
        }
    });
};

// update data on specific todoListItem
exports.updateExercise = function(req, res) {
    Exercise.findOne({
        where: {
            workoutId: req.params.workoutId,
            id: req.params.id
        }
    })
    .then((exercise) => {

        console.log(exercise);

        if (exercise == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            exercise.update({
                done: req.body.done
            })
            .then((exercise) => res.status(200).json(exercise));
        }
    });
};

// delete a specific todoListItem
exports.deleteExercise = function (req, res) {
    Exercise.findOne({
        where: {
            workoutId: req.params.workoutId,
            id: req.params.id
        }
    })
    .then((exercise) => {

        console.log(exercise);

        if (exercise == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            exercise.destroy().then(() => {
                res.status(200).json({
                    "message": `item ${req.params.id} from list ${req.params.workoutId} was deleted`
                })
            });
        }
    });
};