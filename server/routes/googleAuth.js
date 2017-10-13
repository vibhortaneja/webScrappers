//importing pre-defined dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

//importing user-defined dependencies
const configuration = require('./../config/googleAuth');

/* GOOGLE ROUTER */
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    })
);

//Google callback router
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: configuration.successRedirect,
        failureRedirect: configuration.failureRedirect
    })
);

module.exports = router;