var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../util/config')
var User = require('../models/user.model');

// Login Route
router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var pw = req.body.password;
  User.findOne({ 'email': email }, function (err, profile) {
    if (err) return res.status(500).json(err);
    console.log(profile);
    if (!profile) {
      res.status(400).json({ msg: 'INVALID_USER' });
    } else if (!profile.validPassword(pw)) {
      res.status(400).json({ msg: 'INVALID_PW' });
    } else {
      const payload = {
        userId: profile._id,
        firstname: profile.firstName,
        lastname: profile.lastName,
        email: profile.email,
        dateOfBirth: profile.dateOfBirth,
        mobile: profile.mobile,
        status: profile.status,
        accountType: profile.accountType
      };
      var token = jwt.sign(payload, config.secret, {
        expiresIn: '7d' // expires in 1 week
      });
      res.status(200).json({ profile: payload, token: token });
    }
  });
});

//Validate user token
router.get('/validate', function (req, res, next) {
  var token = req.get('Authorization');
  console.log(token);
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'INVALID_TOKEN' });
      } else {
        return res.status(200).json({ data: decoded });
      }
    });

  } else {
    return res.status(500).json({ status: 500, message: 'NO_TOKEN' });
  }
});

module.exports = router;