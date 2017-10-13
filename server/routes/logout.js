//importing pre-defined dependencies
const express = require('express');
const router = express.Router();

//importing user-defined dependencies
const logger = require('../services/app.logger');

//route for logout
router.get('/logout', function(req, res) {
    res.status(200).send("logout success!");
    logger.info("successfully logged out")
});

module.exports = router;