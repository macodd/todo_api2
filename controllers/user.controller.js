const db = require('../models');

const User = db.user;

// anonymous users
exports.anonBoard = function (req, res) {
    res.status(200).json({
        "message": "Public content"
    })
};

// user logged in auth
exports.userBoard = function(req, res) {
    res.status(200).json({
        "message" : "User Content"
    });
};

// get all todos for the specific user
exports.getUserTodos = function (req, res) {
    User.findOne({ where: { id: req.params.userId }, include: db.todoList }).then(
        (user) => {
            if(!user) {
                res.status(404).json({
                    "message": "User not Found"
                });
            }
            else {
                res.status(200).json(user);
            }
        }
    );
}