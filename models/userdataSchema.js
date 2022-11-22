const mongoose = require('mongoose');
const Comments = require('./rorschachs.js');

const commentSchema = mongoose.Schema({
	image: String,
	comments: [Comments.schema]
});

const Author = mongoose.model('Comments', commentSchema);

module.exports = Comments;
