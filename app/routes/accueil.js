const router = require('express').Router()
const ProjectManager = require('../controllers/project')

router.get('/', async (req, res) => {
    if (!req.user) {
        let projects = await ProjectManager.getLatest().then(projects => projects)
        res.render('index-pasco', {projects})
    }
    else {
        let projects = await ProjectManager.getUserProjects(req.user._id, true).then(projects => projects)
        res.render('index-co', {projects})
    }
})

module.exports = router