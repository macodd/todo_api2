const db = require('../models');

const User = db.user;
const Goal = db.goal;
const Address = db.address;

exports.newUserGoal = function (req, res) {
    User.findOne({ where : { id : req.params.userId }}).then(
        user => {
            Goal.create({
                currentWeight : req.body.currentWeight,
                goalWeight : req.body.goalWeight,
                height : req.body.height,
                goalType : req.body.goalType,
                userId : user.id
            }).then(() => {
                return res.status(200).json({
                    message: "Goal created"
                })
            }, err =>  {
                return res.status(400).json({
                    message: err.message
                })
            })
        }
    )
}

exports.newUserAddress = function (req, res) {
    User.findOne({ where : { id : req.params.userId }}).then(
        user => {
            Address.create({
                street : req.body.street,
                city : req.body.city,
                state : req.body.state,
                country : req.body.country,
                zipcode : req.body.zipcode,
                userId : user.id
            }).then(() => {
                return res.status(200).json({
                    message: "address created"
                })
            },
                err => {
                return res.status(400).json({
                    message: err.message
                });
            });
        }
    )
}