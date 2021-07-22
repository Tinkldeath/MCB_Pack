const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const userScheme = new Schema({
    login: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', userScheme,'users');