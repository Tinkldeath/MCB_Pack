const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const categoryScheme = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Category', categoryScheme, 'categories');