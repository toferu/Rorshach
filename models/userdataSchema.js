// const mongoose = require('mongoose');
// const Comments = require('./rorschachs.js');

// const commentSchema = mongoose.Schema({
// 	image: String,
// 	comments: [Comments.schema]
// });

// const Author = mongoose.model('Comments', commentSchema);

// module.exports = Comments;
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    image: {type: String},
    statement: {type: String},
    comment: {type: String}
}, {timestamps: true})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments