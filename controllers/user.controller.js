const db = require('../models');

const User = db.user;

// anonymous users
exports.allAccessBoard = function (req, res) {
    res.status(200).json({
        message: "Public content"
    })
};

// user logged in auth
exports.userBoard = function (req, res) {
    if (req.params.userId) {
        User.findOne({
            where: {
                id: req.params.userId
            },
            include: [
                db.profile,
                db.address,
                db.goal,
                db.workout
            ]
        }).then(
            user => {
                if(!user) {
                    res.status(404).json({
                        message: "User not Found"
                    });
                }
                else {
                    res.status(200).json(user);
                }
            }
        );
    }
    else {
        res.status(200).json({
            message: "User Content"
        })
    }

};

// admin logged in
exports.adminBoard = function (req, res) {
    res.status(200).json({
        message : "Admin Content"
    });
}

// trainer logged in
exports.trainerBoard = function (req, res) {
    res.status(200).json({
        message : "Trainer Content"
    });
};