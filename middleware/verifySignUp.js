// database models
const db = require("../models");

// Roles and user models
const ROLES = db.ROLES;
const User = db.user;

// check for email already in use
duplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            res.status(400).json({
                message: "Email already in use."
            });
            return;
        }
        next();
    })
}

// checks for the existence of the role
roleExists = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({
                    message: "Role does not exist"
                });
                return;
            }
        }
    }
    next();
}

// functions for backend validation
const verifySignUp = {
    duplicateEmail: duplicateEmail,
    roleExists: roleExists
};

module.exports = verifySignUp;