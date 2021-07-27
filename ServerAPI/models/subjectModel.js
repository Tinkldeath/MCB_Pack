const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Scheme setup
const subjectScheme = new Schema({
    categoryId: Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('Subject', subjectScheme,'subjects');