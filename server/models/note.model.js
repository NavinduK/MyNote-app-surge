var mongoose = require('mongoose');

var note = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Note',note);