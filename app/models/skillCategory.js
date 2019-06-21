const mongoose = require('mongoose')

const skillCategorySchema = mongoose.Schema({
    _id: String,
    name: String,
    color: String
})

module.exports = mongoose.model('skillCategory', skillCategorySchema, 'skillCategories')