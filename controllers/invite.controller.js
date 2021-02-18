const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const db = require('../models');
const User = db.user;

const EMAIL = "no-reply@fitness.fit"
//
// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     secure: true,
//     auth: {
//         user: "<email>",
//         password: "<password>"
//     }
// });

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Fitness app",
        link: "https://localhost:3000/"
    }
});

exports.signup = function (req, res) {
    const userEmail = req.body.email;
    const name = req.body.name;

    let response = {
        body: {
            name,
            intro: "Welcome to Fitness Workout"
        }
    }

    let mail = MailGenerator.generate(response);

    // let message = {
    //     from: EMAIL,
    //     to: userEmail,
    //     subject: "Signup successful",
    //     html: mail
    // };

    // transporter
    //     .sendMail(message)
    //     .then(() => {
    //         return res.status(200).json({
    //             message: "Check your inbox"
    //         });
    //     },
    //     (err) => {
    //         return res.status(400).json({
    //             message: err.message
    //         });
    //     });
};

exports.invite = function (req, res) {
    User.findOne({ where: { id: req.params.userId } } ).then(user => {
        const { userEmail, firstName, lastName, message }  = req.body;

        const name = firstName + " " + lastName;
        const subject = user.id + " wants you to try out our fitness app";

        let response = {
            body: {
                name,
                intro: message
            }
        }

        let mail = MailGenerator.generate(response);

        require('fs').writeFileSync('preview.html', mail, 'utf8');

        return res.status(200).json({
            message: "email sent"
        })

        // let msg = {
        //     from: EMAIL,
        //     to: userEmail,
        //     subject: subject,
        //     html: mail
        // };

        // transporter
        //     .sendMail(msg)
        //     .then(() => {
        //             return res.status(200).json({
        //                 message: "Email invite sent!"
        //             })
        //         },
        //         (err) => {
        //             return res.status(400).json({
        //                 message: err.message
        //             })
        //         });
    },
    err => {
        return res.status(400).json({
            message: "No user found"
        });
    })
}