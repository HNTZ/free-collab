const ProjectCategoryModel = require('../models/projectCategory');
const ProjectModel = require('../models/project');
const mongoose = require('mongoose');

class ProjectManager {
	static getProjectCategories() {
		return new Promise(async resolve => {
			let categories = await ProjectCategoryModel.find({}).then(projectCategories => projectCategories);
			resolve(categories);
		});
	}

	static createProject(Project, _id) {
		let newProject = new ProjectModel({
			_id: mongoose.Types.ObjectId(),
			...Project,
			creator: _id
		});
		return newProject.save();
	}

	static updateProject(Project, _id) {
		return ProjectModel.findOneAndUpdate({ _id }, { $set: { ...Project, last_update_date: new Date() } });
	}

	static getLatest() {
		return new Promise(async resolve => {
			let projects = await ProjectModel.find().then(projects => projects.slice(-5).reverse());
			projects = await Promise.all(
				projects.map(async project => {
					return await ProjectCategoryModel.findOne({ _id: project.projectCategory_id }).then(cat => ({
						...project._doc,
						category: cat.name
					}));
				})
			);
			resolve(projects);
		});
	}

	static getProjectById(id) {
		return new Promise(async resolve => {
			let project = await ProjectModel.findOne({ _id: id }).then(project => project);
			let category = await ProjectCategoryModel.findOne({ _id: project.projectCategory_id }).then(
				cat => cat.name
			);
			resolve({
				...project._doc,
				category
			});
		});
	}

	static getUserProjects(id, latest) {
		return new Promise(async resolve => {
			let projects = await ProjectModel.find({
				$or: [{ creator: id }, { 'members._id': id }]
			}).then(projects => (latest ? projects.slice(-5).reverse() : projects.reverse()));
			projects = await Promise.all(
				projects.map(async project => {
					return await ProjectCategoryModel.findOne({ _id: project.projectCategory_id }).then(cat => ({
						...project._doc,
						category: cat.name
					}));
				})
			);
			resolve(projects);
		});
	}

	static async getAll() {
		let projects = await ProjectModel.find({}).then(projects => projects.reverse());
		projects = await Promise.all(
			projects.map(async project => {
				return await ProjectCategoryModel.findOne({ _id: project.projectCategory_id }).then(cat => ({
					...project._doc,
					category: cat.name
				}));
			})
		);
		return projects;
	}

	static async getWithQuery(query) {
		let projects = null;
		if (query.query && query.cat) {
			projects = await ProjectModel.find({
				name: new RegExp(query, 'i'),
				projectCategory_id: query.cat
			}).then(projects => projects.reverse());
		} else if (query.query) {
			projects = await ProjectModel.find({ name: new RegExp(query, 'i') }).then(projects => projects.reverse());
		} else if (query.cat) {
			projects = await ProjectModel.find({ projectCategory_id: query.cat }).then(projects => projects.reverse());
		}
		projects = await Promise.all(
			projects.map(async project => {
				return await ProjectCategoryModel.findOne({ _id: project.projectCategory_id }).then(cat => ({
					...project._doc,
					category: cat.name
				}));
			})
		)
		return projects;
	}
}

module.exports = ProjectManager;
