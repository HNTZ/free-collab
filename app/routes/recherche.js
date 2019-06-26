const router = require('express').Router()
const ProjectManager = require('../controllers/project')

router.get('/', async (req, res) => {
    let projects = null
    if (req.query.query || req.query.cat) {
        projects = await ProjectManager.getWithQuery(req.query)
    }
    else {
        projects = await ProjectManager.getAll()
    }
    res.render('recherche', {projects: projects.projects, count: projects.count, query: req.query.query, cat: req.query.cat})
})

module.exports = router