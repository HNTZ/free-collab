const mongoose = require('mongoose')

const projectCategorySchema = mongoose.Schema({
    _id: String,
    name: String,
    color: String
})

module.exports = mongoose.model('projectCategory', projectCategorySchema, 'projectCategories')