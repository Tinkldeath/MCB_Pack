const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const scheduleScheme = new Schema({
    groupId: Schema.Types.ObjectId,
    chisl: Boolean,
    pairs: Array
});


module.exports = mongoose.model('Schedule',scheduleScheme);