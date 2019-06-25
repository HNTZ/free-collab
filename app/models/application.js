const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    notice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notice'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: String,
    status: String,
    description: String,
    date:  {
        type: Date,
        default: Date.now()
    },
    responses: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            message: String,
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

module.exports = mongoose.model('application', applicationSchema)