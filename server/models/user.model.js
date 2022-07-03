var mongoose = require('mongoose');
var crypto = require('crypto');

var user = new mongoose.Schema({
    //Use mongo _id as userId
    firstName: String,
    lastName: String,
    email:{type: String, unique: true},
    dateOfBirth: Date,
    mobile: Number,
    status: Boolean,
    password: String,
    accountType: String
});

module.exports = mongoose.model('User',user);