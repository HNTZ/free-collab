const router = require('express').Router()
const {loggedInOnly} = require('../middleware')
const ProjectManager = require('../controllers/project')

router.get('/', loggedInOnly, async (req, res) => {
    let projects = await ProjectManager.getUserProjects(req.user._id).then(projects => projects)
    res.render('projets', {projects})
})

router.get('/nouveau', loggedInOnly, (req, res) => {
    res.render('nouveau-projet', {project: null})
})

router.post('/nouveau', loggedInOnly, (req, res) => {
    ProjectManager.createProject(req.body, req.user._id).then(project => {
        res.redirect('/projets/' + project._id)
        // TO DO
        // res.redirect('projets/' + project._id)
    })
    .catch(err => res.render('nouveau-projet', {project, errors: "Une erreur a eu lieu"}))
})

router.get('/:id', async (req, res) => {
    let project = await ProjectManager.getProjectById(req.params.id).then(project => project)
    res.render('projet', {project})
})

router.get('/modifier/:id', async (req, res) => {
    let project = await ProjectManager.getProjectById(req.params.id).then(project => project)    
    if (!req.user || req.user._id.toString() !== project.creator.toString()) {
        res.redirect('/projets/' + project._id)
    }
    else {
        res.render('modifier-projet', {project})
    }
})

router.post('/modifier/:id', async (req, res) => {
    let project = await ProjectManager.updateProject(req.body, req.params.id).then(project => project)        
    if (project)
        res.redirect('/projets/' + req.params.id)
    else 
        res.redirect('/projets/modifier/' + req.params.id)
})

module.exports = router