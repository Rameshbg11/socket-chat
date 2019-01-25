const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { versionKey: false });

const User = module.exports = mongoose.model('User', UserSchema);

// Hash the password
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

// Get the user by Key (email or password)
module.exports.getUserByKey = function (key, keyVal, callback) {
    let query = {};
    if (key == 'username')
        query = { username: keyVal };
    else
        query = { email: keyVal };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// Compare the password
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
