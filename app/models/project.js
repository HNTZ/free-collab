const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    projectCategory_id: {
        type: String,
        ref: 'projectCategory'
    },
    description: String,
    creation_date:  {
        type: Date,
        default: Date.now()
      },
    latest_update_date: Date,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    members: [
        {
            id: mongoose.Schema.Types.ObjectId,
            admin: Boolean
        }
    ],
    repository: String,
    website: String
})

module.exports = mongoose.model('project', projectSchema)