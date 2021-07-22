const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const postScheme = new Schema({
    postId: Schema.Types.ObjectId,
    postName: String,
    postTheme: String,
    courseNumber: Number,
    author: String,
    year: Number,
    university: String,
    special: String,
    description: String
});

module.exports = mongoose.model('Post', postScheme);