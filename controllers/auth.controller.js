// database models
const db = require("../models");
// secret key
const config = require("../config/auth.config");
// json web token library
var jwt = require('jsonwebtoken');
// encryption library
var bcrypt = require('bcryptjs');

const User = db.user;

exports.login = function (req, res) {
    User.findOne({ where : { email : req.body.email } })
        .then((user) => {
            // if no user
            if(!user) {
                return res.status(404).json({
                    "message" : "User not found"
                });
            }

            var validPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                // 401: Unauthorized
                return res.status(401).json({
                    "accessToken": null,
                    "message" : "Invalid password"
                })
            }

            var token = jwt.sign(
                { id: user.id },
                config.secretAuthKey,
                {
                    expiresIn: 3600  // 1 hour
                });

            // 200 : OK
            res.status(200).json({
                "id" : user.id,
                "email": user.email,
                "accessToken": token
            })
        });
}