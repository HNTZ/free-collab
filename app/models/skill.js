const mongoose = require('mongoose')

const skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    skillCategory_id: {
        type: String,
        ref: 'skillCategory'
    }
})

module.exports = mongoose.model('skill', skillSchema)