// database models
const db = require("../models");
// secret key
const config = require("../config/auth.config");
// json web token library
const jwt = require('jsonwebtoken');
// encryption library
const bcrypt = require('bcryptjs');

const User = db.user;

// login function
exports.login = function (req, res) {
    // search for a user based on the email (unique)
    User.findOne({ where : { email : req.body.email } })
        .then((user) => {
            // if no user
            if(!user) {
                return res.status(404).json({
                    "message" : "User not found"
                });
            }

            // decrypt password
            const validPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            // invalid password
            if (!validPassword) {
                // 401: Unauthorized
                return res.status(401).json({
                    "accessToken": null,
                    "message" : "Invalid password"
                })
            }

            // sign in user an assign a payload in seconds
            const token = jwt.sign(
                {id: user.id},
                config.secretAuthKey,
                {
                    expiresIn: 3600  // 1 hour
                });

            // return the user information
            // 200 : OK
            res.status(200).json({
                "id" : user.id,
                "email": user.email,
                "accessToken": token
            })
        });
}