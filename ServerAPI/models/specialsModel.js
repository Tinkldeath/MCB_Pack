const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const specialsScheme = new Schema({
    specName: String
});

module.exports = mongoose.model('Specials',specialsScheme);