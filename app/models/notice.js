const mongoose = require('mongoose')

const noticeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    description: String,
    creation_date:  {
        type: Date,
        default: Date.now()
    },
    latest_update_date: Date,
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skill'
        }
    ],
})

module.exports = mongoose.model('notice', noticeSchema)