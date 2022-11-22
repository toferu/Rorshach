const mongoose = require('mongoose')

const rorschachSchema = new mongoose.Schema({
    image: {type: String},
    statement: {type: String},
    comment: {type: String}
}, {timestamps: true})

const Rorschachs = mongoose.model('Rorschach', rorschachSchema)

module.exports = Rorschachs