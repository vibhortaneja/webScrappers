//importing pre-defined dependencies
let express = require('express');
let router = express.Router();

//importing user-defined dependencies
let User = require('../models/userModel');
let logger = require('../services/app.logger');

// route to update investment of the given email id
router.put('/investment/:email', (req, res) => {
    let obj = {
        items: req.body.items,
        frequency: req.body.frequency
    }
    User.findOneAndUpdate({ email: req.params.email }, {
        // updating preferences
        $set: {
            preferences: [obj]
        }
    }, (err, Data) => {
        // action to take if error occurs 
        if (err) {
            logger.error("error occured");
        }
        // action to take when there is no error
        else {
            logger.info("preferences set successfully")
            res.send(Data);
        }
    });
});

module.exports = router;