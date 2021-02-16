// json web token encryption library
const jwt = require('jsonwebtoken');
// secret key
const config = require('../config/auth.config');
// database
const db = require("../models");
// user
const User = db.user;

// checks to see if token is provided
verifyToken = function (req, res, next) {
    // get token from headers
    let token = req.headers["x-access-token"];

    // return error if no token was passed
    if(!token) {
        // 403 : Forbidden
        return res.status(403).json({
            message : "No token provided"
        });
    }

    // verify the token based on the secret key
    jwt.verify(token, config.secretAuthKey, function (err, decoded) {
        if (err) {
            // 401 : Unauthorized
            return res.status(401).json({
                message : "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).json({
                message: "Admin Role required"
            });
        });
    });
};

isTrainer = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "trainer") {
                    next();
                    return;
                }
            }
            res.status(403).json({
                message: "Trainer Role required"
            });
        });
    });
};

isTrainerOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "trainer") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).json({
                message: "Trainer or Admin Role required"
            });
        });
    });
};

// auth header token
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTrainer: isTrainer,
    isTrainerOrAdmin: isTrainerOrAdmin
};

module.exports = authJwt;