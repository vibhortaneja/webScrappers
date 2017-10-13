/*requiring dependencies*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// structure of nasdaq data in database
const nasdaqschema = new Schema({

    Code: String,
    Company: String,

}, { collection: 'nasdaq' });

var nasdaqdata = mongoose.model('nasdaq', nasdaqschema);

module.exports = nasdaqdata;