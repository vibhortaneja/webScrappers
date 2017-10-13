/*requiring predefined dependencies*/
const nodemailer = require('nodemailer');
const express = require('express');
const async = require('async');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

/*requiring user defined dependencies*/
const User = require('../models/userModel')
const configure = require('../config/configure');
const logger = require('../services/app.logger');

// route to get user information corresponding to given email
router.get('/findUser/:email', function(req, res) {
    // finding user corresponding to given email
    User.findOne({ email: req.params.email }, (err, data) => {
        if (err) {
            logger.info("user not found");
            res.send({ success: false, message: 'user not found' })
        } else {
            logger.info("user found in database")
            res.json(data);
        }
    })
})

module.exports = router;