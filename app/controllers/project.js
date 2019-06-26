const ProjectCategoryModel = require("../models/projectCategory")
const ProjectModel = require("../models/project")
const UserManager = require("../controllers/user")
const ApplicationManager = require("../controllers/application")
const mongoose = require("mongoose")
const moment = require("moment")

class ProjectManager {
  static getProjectCategories() {
    return new Promise(async resolve => {
      let categories = await ProjectCategoryModel.find({}).then(
        projectCategories => projectCategories
      )
      resolve(categories)
    })
  }

  static createProject(Project, _id) {
    let newProject = new ProjectModel({
      _id: mongoose.Types.ObjectId(),
      ...Project,
      creator: _id
    })
    return newProject.save()
  }

  static updateProject(Project, _id) {
    return ProjectModel.findOneAndUpdate(
      { _id },
      { $set: { ...Project, latest_update_date: new Date() } }
    )
  }

  static getLatest() {
    return new Promise(async resolve => {
      let projects = await ProjectModel.find().then(projects =>
        projects.slice(-4).reverse()
      )
      projects = await Promise.all(
        projects.map(async project => {
          return await ProjectCategoryModel.findOne({
            _id: project.projectCategory_id
          }).then(cat => ({
            ...project._doc,
            category: cat.name
          }))
        })
      )
      resolve(projects)
    })
  }

  static getProjectById(_id) {
    return new Promise(async resolve => {
      let project = await ProjectModel.findOne({ _id }).then(project => project)
      let category = await ProjectCategoryModel.findOne({
        _id: project.projectCategory_id
      }).then(cat => cat)
      let admins = [
        project.creator.toString ? project.creator.toString() : project.creator
      ]
      let creatorName = await UserManager.getUserName(project.creator)
      let membersName = await Promise.all(
        project.members.map(async member => {
          if (member.admin) {
            admins.push(member._id)
          }
          return await UserManager.getUserName(member._id)
        })
      )
      let membersTemp = [
        project.creator.toString ? project.creator.toString() : project.creator
      ]
      project.members.map(member => membersTemp.push(member._id))
      let applications = await ApplicationManager.getProjectApplications(
        _id
      ).then(app => app)
      let creation_date = moment(project.creation_date).format("DD/MM/YYYY")
      let latest_update_date = project.latest_update_date
        ? moment(project.latest_update_date).format("DD/MM/YYYY")
        : null
      resolve({
        ...project._doc,
        category,
        creator: {
          _id: project.creator,
          name: creatorName
        },
        members: membersTemp,
        membersName,
        creation_date,
        admins,
        latest_update_date,
        applications
      })
    })
  }

  static getUserProjects(id, latest) {
    return new Promise(async resolve => {
      let projects = await ProjectModel.find({
        $or: [{ creator: id }, { "members._id": id }]
      }).then(projects =>
        latest ? projects.slice(-4).reverse() : projects.reverse()
      )
      projects = await Promise.all(
        projects.map(async project => {
          return await ProjectCategoryModel.findOne({
            _id: project.projectCategory_id
          }).then(cat => ({
            ...project._doc,
            category: cat.name
          }))
        })
      )
      resolve(projects)
    })
  }

  static async getAll() {
    let projects = await ProjectModel.find({}).then(projects =>
      projects.reverse()
    )
    projects = await Promise.all(
      projects.map(async project => {
        return await ProjectCategoryModel.findOne({
          _id: project.projectCategory_id
        }).then(cat => ({
          ...project._doc,
          category: cat.name
        }))
      })
    )
    return {count: projects.length, projects}
  }

  static async getWithQuery(query) {
    let projects = null
    if (query.query && query.cat) {
      projects = await ProjectModel.find({
        name: new RegExp(query.query, "i"),
        projectCategory_id: query.cat
      }).then(projects => projects.reverse())
    } else if (query.query) {
      projects = await ProjectModel.find({
        name: new RegExp(query.query, "i")
      }).then(projects => projects.reverse())
    } else if (query.cat) {
      projects = await ProjectModel.find({
        projectCategory_id: query.cat
      }).then(projects => projects.reverse())
    }
    projects = await Promise.all(
      projects.map(async project => {
        return await ProjectCategoryModel.findOne({
          _id: project.projectCategory_id
        }).then(cat => ({
          ...project._doc,
          category: cat.name
        }))
      })
    )
    return {count: projects.length, projects}
  }

  static async addMember(user_id, project_id) {
    return await ProjectModel.findOneAndUpdate(
      { _id: project_id },
      {
        $push: {
          members: {
            _id: user_id,
            admin: false
          }
        }
      }
    ).then(ok => console.log(ok))
  }
}

module.exports = ProjectManager
