const mongoose = require('mongoose');
const UserManager = require('../controllers/user')
const ProjectManager = require('../controllers/project')
const ApplicationModel = require('../models/application')
const moment = require('moment')

class ApplicationManager {
    static async getUserApplications(user_id, latest) {
        let applications =  await ApplicationModel.find({user_id}).then(applications => latest ? applications.slice(-4).reverse() : applications.reverse())
        return Promise.all(applications.map(async app => {
            let ProjectManager = require('../controllers/project')
            let project = await ProjectManager.getProjectById(app.project_id).then(project => project)
            let notice = null
            if (app.notice_id) {
                notice = "Lol"
            }
            return {
                ...app._doc,
                project: project.name,
                projet_id: project._id,
                notice
            }
        }))
    }

    static async createApplication(user_id, project_id) {
        let newApplication = new ApplicationModel({
            _id: mongoose.Types.ObjectId(),
            user_id,
            project_id
        })
        return newApplication.save()
    }

    static async getProjectApplications(project_id) {
        let applications = await ApplicationModel.find({project_id, status: "En attente"}).then(application => application.reverse())
        return Promise.all(applications.map(async app => {
            let date = moment(app.date).format('DD/MM/YYYY')
            let user = await UserManager.getUserName(app.user_id)
            let skills = await UserManager.getUserSkills(app.user_id)
            return {
                ...app._doc,
                project_id,
                user,
                date,
                skills
            }
        }))
    }

    static async setAccepted(_id) {
        return await ApplicationModel.findOne({_id}).then(async app => {
            let ProjectManager = require('../controllers/project')
            return await ProjectManager.addMember(app.user_id, app.project_id).then(async (ok) => {
                console.log('test')
                return await ApplicationModel.findOneAndUpdate({_id}, {$set: {status: "Accepté"}}).then(app => app.project_id)
            })
        })
    }

    static async setRefused(_id) {
        return await ApplicationModel.findOneAndUpdate({_id}, {$set: {status: "Refusé"}}).then(app => app.project_id)
    }

}

module.exports = ApplicationManager