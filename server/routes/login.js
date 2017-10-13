//importing pre-defined dependencies
const path = require('path');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

//importing user-defined dependencies
const config = require('../config/database');
const logger = require('../services/app.logger');
const User = require('../models/userModel')

// route to login with given email and password
router.get('/signin/:email/:password', function(req, res) {
    User.findOne({
        email: req.params.email
    }, function(err, user) {
        if (err) {
            return res.status(400).send({ success: false, message: 'There is error in finding' })
            logger.info("error");
        }
        if (!user) {

            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
            logger.info("Authentication failed. User not found");
        } else {
            // check if password matches
            user.comparePassword(req.params.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign({ user }, config.secret);
                    // return the information including token as JSON

                    return res.status(200).send({ success: true, token: 'JWT ' + token, email: user.email, flag: user.flag });

                    logger.info("token generated successfully");
                } else {
                    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    logger.info("Authentication failed. Wrong password.");
                }
            });
        }
    });
});

// route to get all the users
router.get('/', function(req, res) {
    User.find((err, data) => {
        // if error occurs send the failure message
        if (err) {
            res.send({ success: false, message: "error in finding" })
            logger.info("error");
        } else {
            // send success message if there is no failure
            res.json(data)
            logger.info("data fetched successfully");
        }
    })
})

module.exports = router;