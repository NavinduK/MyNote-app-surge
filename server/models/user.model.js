var mongoose = require('mongoose');
var crypto = require('crypto');

var user = new mongoose.Schema({
    //Use mongo _id as userId
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    dateOfBirth: Date,
    mobile: Number,
    status: Boolean,
    salt: String,
    password: String,
    accountType: String,
    notes: [{type: mongoose.Schema.ObjectId, ref: 'Note'}],
});

user.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
    console.log(this.salt + ", " + this.password);
}

user.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 250, 64, 'sha512').toString('hex');
    console.log(this.password === hash);
    return this.password === hash;
};

module.exports = mongoose.model('User', user);