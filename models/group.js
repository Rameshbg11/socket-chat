const mongoose = require('mongoose');

// Group Chat Schema
const GroupSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    msgList: [{
        username: {
            type: String
        },
        time: {
            type: Date
        },
        grantLevel: {
            type: String
        },
        msg: {
            type: String
        }
    }]
}, { versionKey: false });

const Group = module.exports = mongoose.model('Group', GroupSchema);