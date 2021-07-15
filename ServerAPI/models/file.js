const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const fileScheme = new Schema({
    postId: Schema.Types.ObjectId,
    file: Schema.Types.Mixed
});

module.exports = mongoose.model('File', fileScheme);