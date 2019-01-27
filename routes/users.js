const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');
const Group = require('../models/group');

// Register a user
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    let key;

    const password = req.body.password;
    if ('username' in req.body)
        key = 'username';
    else if ('email' in req.body)
        key = 'email';

    User.getUserByKey(key, req.body[key], (err, user) => {
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

// Get Profile
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

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403);
    }
}

// Create grp and push chat
router.post('/msg', checkToken, function (req, res, next) {
    let statusCode = (verifyToken(req.token, config.secret));
    if (statusCode === 400) {
        Group.updateOne({ groupName: req.body.groupName }, { $push: { msgList: [req.body.userMsg] } }, { upsert: true }).then(function (grp) {
            res.send(grp);
        }).catch(next);
        return res.json({ status: 400, msg: 'SUCCESS: Connected to protected route' });
    }
    else if (statusCode === 205)
        return res.json({ status: 215, msg: 'No token provided' });
    else
        return res.json({ status: 500, msg: 'Error' });
});


// Get all chats
router.get('/getallchats', checkToken, function (req, res, next) {
    let statusCode = (verifyToken(req.token, config.secret));
    if (statusCode === 400) {
        Group.find({}).then(function (result) {
            res.send(result);
        });
        // return res.json({ status: 400, msg: 'SUCCESS: Connected to protected route' });
    }
    else if (statusCode === 205)
        return res.json({ status: 215, msg: 'No token provided' });
    else
        return res.json({ status: 500, msg: 'Error' });
});


function verifyToken(token, secret) {
    let status;
    jwt.verify(token, secret, (err, decoded) => {
        if (err)
            status = 215;
        else if (decoded)
            status = 400;
        else
            status = 500;
    });
    return status;
}

module.exports = router;