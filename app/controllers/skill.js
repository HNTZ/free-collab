const SkillModel = require("../models/skill")
const SkillCategoryModel = require("../models/skillCategory")

class SkillManager {
  static getSkillsByCategory() {
    return new Promise(async resolve => {
      let categories = await SkillCategoryModel.find({}).then(
        skillCategories => skillCategories
      )
      categories = Promise.all(
        categories.map(async category => {
          let skills = await SkillModel.find({
            skillCategory_id: category._id
          }).then(skills => skills)
          return { ...category._doc, skills }
        })
      )
      resolve(categories)
    })
  }

  static async getSkillById(_id) {
    return await SkillModel.findOne({ _id }).then(async skill => {
      let category = await SkillCategoryModel.findOne({_id: skill.skillCategory_id}).then(skillCategory => skillCategory)
      return {
        ...skill._doc,
        category
      }
    })
  }
}

module.exports = SkillManager
