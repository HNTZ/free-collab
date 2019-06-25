const mongoose = require('mongoose');
const UserManager = require('../controllers/user')
const ApplicationModel = require('../models/application')

class ApplicationManager {
    static async getUserApplications(user_id) {
        return await ApplicationModel.find({user_id}).then(application => application)
    }

    static async createApplication(Application, user_id) {
        let newApplication = new ApplicationModel({
            _id: mongoose.Schema.Types.ObjectId,
            ...Application,
            user_id
        })
        return newApplication.save()
    }
}

module.exports = ApplicationManager