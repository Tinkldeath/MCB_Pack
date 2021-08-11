const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const postScheme = new Schema({
    ownerId: Schema.Types.ObjectId,
    name: String,
    theme: String,
    courseNumber: Number,
    author: String,
    year: Number,
    university: String,
    category: String,
    subject: String,
    description: String,
    fileUrl: String
});

module.exports = mongoose.model('Post', postScheme, 'posts');