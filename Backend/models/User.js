const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    personalNumber: {
        type: Number,
        required: true,
    },
    parentNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    marksheetURL: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema, 'User');
module.exports = User;
