const ProjectCategoryModel = require("../models/projectCategory")
const ProjectModel = require("../models/project")
const mongoose = require('mongoose')

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
      creator: _id,
    })
    return newProject.save()
  }

  static getProjectById(id) {
    return new Promise
  }
}

module.exports = ProjectManager
