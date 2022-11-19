const mongoose = require('mongoose')

const rorschachSchema = new mongoose.Schema({
    image: {type: String},
    statement: {type: String},
})

const Rorschachs = mongoose.model('Rorschach', rorschachSchema)

module.exports = Rorschachs