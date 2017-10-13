/*requiring dependencies*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// structure of funds data saved in database
const fundschema = new Schema({
    Time: String,
    Headline: String,
    News: String,
    day:Number,
    month:Number,
    year:Number,
}, { collection: 'fund' });

var fundmodel = mongoose.model('fund', fundschema);

module.exports = fundmodel;