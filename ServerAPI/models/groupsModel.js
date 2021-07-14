const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const groupsScheme = new Schema({
    specId: Schema.Types.ObjectId,
    groupName: String,
    courseNumber: Number
});

module.exports = mongoose.model('Groups', groupsScheme);