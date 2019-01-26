const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');


// Register a user
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (user)
            return res.json({ success: false, msg: 'User already exists' });
        else {
            User.createUser(newUser, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to register user'
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'User Registered Successfully'
                    });
                }
            });
        }
    });
});

// Authenticate with returning a token
router.post('/authenticate', (req, res, next) => {
    let key;
    const password = req.body.password;
    if ('username' in req.body)
        key = 'username';
    else if ('email' in req.body)
        key = 'email';


    User.getUserByKey(key, req.body[key], (err, user) => {

        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                }); 
                res.json({
                    success: true,
                    token: 'JWT ' + token,                   
                    expVal: jwt.decode(token).exp,
                    user: {
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

function getToken() {
    User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 //1 week
            });
            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({
                success: false,
                msg: 'Wrong Password'
            });
        }
    });
}

module.exports = router;