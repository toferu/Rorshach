
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    image: {type: String},
    statement: {type: String},
    comments: [
        {
        type: Array,
        date: {type: Date, default: Date.now},
        text: String
        // replies: [{
        //     id: Number, type: Array, date: Date, text: String
        // }]
        }]
}, {timestamps: true})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments