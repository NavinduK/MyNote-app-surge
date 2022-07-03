var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');

//GET users by id
router.get('/:id', function (req, res) {
  User.findById(req.params.id,'-password', (err, user) => {
    if(err) { return res.status(500).json({ msg : 'ERROR_FETCH_USER_BY_ID'}); }
    return res.status(200).json({ data: user });
  });
});

//Get all users
router.get('/', function(req, res, next) {
  User.find({}, (err, user) => {
    if(err) { return res.status(500).json({ msg : 'ERROR_FETCH_USERS', data: err}); }
    console.log(user)
    return res.status(200).json({ data: user });
  });
});

module.exports = router;
