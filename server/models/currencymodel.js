/*requiring dependencies*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// structure of currency data saved in database
const currencyschema = new Schema({
    Time: String,
    Headline: String,
    News: String,
    day:Number,
    month:Number,
    year:Number,

}, { collection: 'currency' });

var currencymodel = mongoose.model('currency', currencyschema);

module.exports = currencymodel;