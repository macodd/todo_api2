// database models
const db = require("../models");
// secret key
const config = require("../config/auth.config");
// json web token library
const jwt = require('jsonwebtoken');
// encryption library
const bcrypt = require('bcryptjs');
// database operations (and, or,..)
const Op = db.Sequelize.Op;

// user and role models
const User = db.user;
const Role = db.role;
const Address = db.address;
const Goal = db.goal;
const Profile = db.profile;

// salt for hashing the password
const SALT = 8;

// signup function that creates a new user, a new address, and a new goal
exports.signup = (req, res) => {

    // Save user to Database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, SALT),
        verified: false
    })
    .then((user) => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then((roles) => {
                user.setRoles(roles);
            });
        }
        else {
            // set user as 'user'
            user.setRoles([1]);
        }

        // creates a profile linked to the user id
        Profile.create({
            userId: user.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            gender: req.body.gender,
        }).catch(err => {
            res.status(400).json({ message: err.message });
        });

        // creates an address linked to the user id
        Address.create({
            userId: user.id
        }).catch(err => {
            res.status(400).json({ message: err.message })
        });

        // creates a goal linked to the user id
        Goal.create({
            userId: user.id
        }).catch(err => {
            res.status(500).json({ message: err.message })
        });

        res.status(200).json({
            message: "User created successfully"
        });
    })
    .catch((err) => {
        res.status(400).json({ message: err.message })
    });
}

// login function
exports.login = function (req, res) {
    // search for a user based on the email (unique)
    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(
        user => {
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
                { id: user.id },
                config.secretAuthKey,
                {
                    expiresIn: 3600  // 1 hour
                });

            const authorities = [];
            user.getRoles().then((roles) => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase())
                }
                // return the user information
                // 200 : OK
                res.status(200).json({
                    "id" : user.id,
                    "email": user.email,
                    "roles": authorities,
                    "accessToken": token
                });
            });
        })
        .catch((err) => {
           res.status(400).json({
               message: err.message
           })
        });
}