/*importing dependencies*/
const config = require('../config/database');
const configure = require('../config/configure');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');
const logger = require('../services/app.logger');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
const router = express.Router();
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');
const signup = require('./signup')
const login = require('./login')
const resetPassword = require('./resetPassword')
const logout = require('./logout')
const googleAuth = require('./googleAuth')
const facebookAuth = require('./facebookAuth')
const update = require('./update')
const findUser = require('./getData')
const preference = require('./preference')
const scrap = require('./scrap')
const tweets = require('./tweets')

/*using middlewares*/
app.use('/signup', signup);
app.use('/login', login);
app.use('/resetPwd', resetPassword);
app.use('/logout', logout);
app.use('/postNews', scrap);
app.use('/find',findUser);
app.use('/googleAuth', googleAuth);
app.use('/facebookAuth', facebookAuth);
app.use('/update',update);
app.use('/investment' , preference);
app.use('/tweets', tweets);

module.exports = app;

