const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const postScheme = new Schema({
    ownerId: Schema.Types.ObjectId,
    postName: String,
    postTheme: String,
    courseNumber: Number,
    author: String,
    year: Number,
    university: String,
    special: String,
    category: String,
    description: String,
    fileUrl: String
});

module.exports = mongoose.model('Post', postScheme, 'posts');