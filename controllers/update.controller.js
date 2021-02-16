const db = require('../models');

// models to be updated
const Goal = db.goal;
const Address = db.address;

// update the goals of user
exports.updateGoal = function (req, res) {
    Goal.findOne({
        where : {
            id : req.params.userId
        }
    }).then(
        goal => {
            goal.update({
                currentWeight : req.body.currentWeight,
                goalWeight : req.body.goalWeight,
                height : req.body.height,
                goalType : req.body.goalType,
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

// update the address of the user
exports.updateAddress = function (req, res) {
    Address.findOne({
        where : {
            id : req.params.userId
        }
    }).then(
        address => {
            address.update({
                street : req.body.street,
                city : req.body.city,
                state : req.body.state,
                country : req.body.country,
                zipcode : req.body.zipcode,
            }).then(() => {
                return res.status(200).json({
                    message: "address updated"
                });
            },
                err => {
                return res.status(400).json({
                    message: err.message
                });
            });
        }
    )
}