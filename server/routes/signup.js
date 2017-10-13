//importing pre-defined dependencies
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

//importing user-defined dependencies
const User = require('../models/userModel')
const config = require('../config/database');
const configure = require('../config/configure');
const logger = require('../services/app.logger');

//This route is used to sign up for a user i.e. a new user
router.post('/users', (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.flag = 0;
    // checking if fields are empty or not
    if (req.body.name == null || req.body.password == null || req.body.email == null || req.body.mobile == null) {
        return res.status(400).json({ success: false, message: 'Ensure all the fields are filled' });
        logger.info("ensure all fields are filled");
    } else {
        user.save((err) => {
            // return name of error in case of error
            if (err) {
                if (err.errors.name) {
                    return res.status(403).json({ success: false, message: err.errors.name.message });
                    logger.info("ensure all fields are filled");
                }
            } else {
                let transporter = nodemailer.createTransport({
                    service: configure.serviceProvider,
                    auth: {
                        user: configure.mailSendingId,
                        pass: configure.mailSendingPass
                    }
                });
                // email template
                let mailOptions = {
                    from: configure.mailSendingId,
                    to: user.email,
                    subject: 'Registered on Personalized-Emailer',
                    text: 'Hello,\n\n' +
                        'You have been successfully registered on Personalized-Emailer.\n',
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        logger.info("cannot send mail");
                    } else {
                        logger.info("mail sent successfully to" + info.response);
                    }
                });
                return res.status(200).json(" success: true, message: 'user created' ");
            }
        })
    }
});
module.exports = router;