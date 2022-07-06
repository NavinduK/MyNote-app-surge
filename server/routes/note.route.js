var express = require('express');
var router = express.Router();
var Note = require('../models/note.model');
var User = require('../models/user.model');
const jwtValidator = require("../util/jwtValidator");


//GET user with notes populated by token
router.get('/', function (req, res) {
    const token = req.get('Authorization');
    console.log("Token"+token);
    const userId = validateToken(token);
    //Add Note and the Note id to the User
    if (userId) {
        User.findById(userId, '-salt -password', (err, user) => {
            if (err) { return res.status(500).json({ msg: 'ERROR_FETCH_NOTE_BY_ID' }); }
            return res.status(200).json({ data: user.notes });
        }).populate('notes');
    } else
        return res.status(500).json({ msg: 'LOGIN_VALIDATION_FAILED' });
    
});

// Add a note
router.post('/add', function (req, res) {
    const token = req.get('Authorization');
    const userId = validateToken(token);
    //Add Note and the Note id to the User
    if (userId) {
        User.findById(userId, (err, user) => {
            if (err)
                return res.status(500).json({ msg: 'ERROR_FIND_USER', data: err });
            var note = new Note(req.body);
            note.save(function (error, noteData) {
                if (error)
                    return res.status(500).json({ msg: 'ERROR_ADDING_NOTE', data: error });
                user.notes.push(noteData._id);
                user.save(function (error2, userData) {
                    if (error2)
                        return res.status(500).json({ msg: 'ERROR_ADDING_NOTE_TO_USER', data: error2 });
                    return res.status(200).json({ data: noteData });
                });
            });
        });
    } else
        return res.status(500).json({ msg: 'LOGIN_VALIDATION_FAILED' });
});

//Update a note
router.put('/update/:noteId', function (req, res) {
    const token = req.get('Authorization');
    const userId = validateToken(token);
    if (userId) {
        Note.findOneAndUpdate({ _id: req.params.noteId }, req.body, { new: true },
            function (err, note) {
                if (err)
                    return res.status(500).json({ msg: 'ERROR_UPDATING_NOTE', data: err });
                return res.status(200).json({ data: note });
            });
    } else
        return res.status(500).json({ msg: 'LOGIN_VALIDATION_FAILED' });
});

//Delete a note
router.delete('/delete/:noteId', function (req, res) {
    //Remove Note and the id from the user
    const token = req.get('Authorization');
    const userId = validateToken(token);
    if (userId) {
        User.findById(userId, (err, user) => {
            if (err)
                return res.status(500).json({ msg: 'ERROR_FIND_USER', data: err });
            Note.findOneAndDelete({ _id: req.params.noteId },
                function (err, note) {
                    if (err)
                        return res.status(500).json({ msg: 'ERROR_DELETING_NOTE', data: err });
                    user.notes.splice(user.notes.indexOf(note._id), 1);
                    user.save();
                    return res.status(200).json({ data: note });
                });
        });
    } else
        return res.status(500).json({ msg: 'LOGIN_VALIDATION_FAILED' });
});

const validateToken = (token) => {
    const result = jwtValidator.validate(token);
    console.log(result);
    if (result.status != 200) {
        return null;
    } else {
        return result.data.userId;
    }
}

module.exports = router;