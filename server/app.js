var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();

var users = require('./routes/user.route');
var auth = require('./routes/auth.route');
var note = require('./routes/note.route');

var MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    , (err, db) => {
        if (err) return console.log(err);
        global.db = mongoose.connection;
        global.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    });

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/notes', note);

module.exports = app;
