const router = require('express').Router()
const ProjectManager = require('../controllers/project')
const ApplicationManager = require('../controllers/application')

router.get('/', async (req, res) => {
    if (!req.user) {
        let projects = await ProjectManager.getLatest().then(projects => projects)
        res.render('index-pasco', {projects})
    }
    else {
        let projects = await ProjectManager.getUserProjects(req.user._id, true).then(projects => projects)
        let applications = await ApplicationManager.getUserApplications(req.user._id, true).then(apps => apps)
        res.render('index-co', {projects, applications})
    }
})

module.exports = router