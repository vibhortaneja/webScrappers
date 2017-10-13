//importing pre-defined dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

//importing user-defined dependencies
const configurationFb = require('./../config/facebookAuth');

/* FACEBOOK ROUTER */
router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
);

// callback url for Personalised Mailer
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: configurationFb.successRedirect,
        failureRedirect: configurationFb.failureRedirect
    })
);
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);
});

module.exports = router;