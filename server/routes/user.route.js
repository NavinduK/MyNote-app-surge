var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');

//GET user by id with notes populated
router.get('/:id', function (req, res) {
    User.findById(req.params.id, '-salt -password', (err, user) => {
        if (err) { return res.status(500).json({ msg: 'ERROR_FETCH_USER_BY_ID' }); }
        return res.status(200).json({ data: user });
    }).populate('notes');
});

// Add a user
router.post('/add', function (req, res, next) {
    var user = new User(req.body);
    user.setPassword(req.body.password);
    user.save(function (err, data) {
        if (err) {
            if (err.code == 11000)
                return res.status(400).json({ msg: 'DUPLICATE_EMAIL', data: err });
            return res.status(500).json({ msg: 'ERROR_ADDING_USER', data: err });
        } else
            return res.status(200).json({ data: data });
    });
});

//Update a user
router.put('/update/:id', function (req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true },
        function (err, user) {
            if (err) {
                if (err.code == 11000)
                    return res.status(400).json({ msg: 'DUPLICATE_EMAIL', data: err });
                return res.status(500).json({ msg: 'ERROR_UPDATING_USER', data: err });
            } else
                return res.status(200).json({ data: user });
        });
});

//Update password
router.put('/update-pass/:id', function (req, res, next) {
    var user = new User();
    user.setPassword(req.body.password);
    var body = {
        salt: user.salt,
        password: user.password,
    }
    User.findOneAndUpdate({ _id: req.params.id }, body, { new: true },
        function (err, data) {
            if (err)
                return res.status(500).json({ msg: 'ERROR_UPDATING_PASSWORD', data: err });
            else
                return res.status(200).json({ data: data });
        });
});

//Delete a user
router.delete('/delete/:id', function (req, res, next) {
    User.findOneAndDelete({ _id: req.params.id },
        function (err, user) {
            if (err) return res.status(500).json({ msg: 'ERROR_DELETING_USER', data: err });
            return res.status(200).json({ data: user });
        });
});

//Get all users
router.get('/', function (req, res, next) {
    User.find({},'-salt -password', (err, user) => {
        if (err) { return res.status(500).json({ msg: 'ERROR_FETCH_USERS', data: err }); }
        console.log(user)
        return res.status(200).json({ data: user });
    });
});

module.exports = router;
