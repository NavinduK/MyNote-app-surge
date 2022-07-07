var mongoose = require('mongoose');
var crypto = require('crypto');

var user = new mongoose.Schema({
    //Use mongo _id as userId
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    dateOfBirth: Date,
    mobile: Number,
    status: {type: Boolean, default: false},
    salt: String,
    password: String,
    accountType: {type: String, default: 'user'},
    notes: [{type: mongoose.Schema.ObjectId, ref: 'Note'}],
});

user.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
}

user.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
    return this.password === hash;
};

module.exports = mongoose.model('User', user);