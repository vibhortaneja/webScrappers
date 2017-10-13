/*requiring dependencies*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const titlize = require('mongoose-title-case');
const validate = require('mongoose-validator');
// structure of user saved in database 
let UserSchema = new Schema({
    name: { type: String },
    id: { type: String },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    preferences: [{
        items: [{ id: Number, itemName: String }],
        frequency: String
    }],
    alternateEmail: { type: String, default: null },
    flag: { type: Number, default: 0 },
});
UserSchema.pre("save", function(next) {
    let obj = {
        items: [{ "id": 1, "itemName": "Funds" }],
        frequency: 'Daily'
    }
    if (this.preferences.length == 0){
        this.preferences.push(obj);}
    
    next();
    
});
//pre method to encrypt password
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) console.log('error occurred line 14');
        user.password = hash;
        console.log(user.password)
        next();
    });

})
UserSchema.plugin(titlize, {
    paths: ['name'] // Array of paths 

});
// pre method to compare encrypted pwd on login(post method on /login)
UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
// schema exported as model
module.exports = mongoose.model('User', UserSchema);