const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const adminsScheme = new Schema({
    login: String,
    password: String
});

module.exports = mongoose.model('Admins',adminsScheme);