const passport = require('passport');
const User = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../config/googleAuth')

passport.use(new GoogleStrategy({
        // pull in our app id and secret from our auth.js file
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        const googleEmail = new User({
            email: profile.email,
            name: profile.displayName
        });

        /* save if new */
        User.findOne({ email: googleEmail.email }, function(err, user) {
            if (!user) {
                googleEmail.save(function(err, googleEmail) {
                    if (err) return done(err);
                    done(null, googleEmail);
                });
            } else {

                done(null, user);
            }
        });
    }));
module.exports;