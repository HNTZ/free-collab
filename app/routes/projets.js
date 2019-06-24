const router = require('express').Router()
const {loggedInOnly} = require('../middleware')
const ProjectManager = require('../controllers/project')

router.get('/', loggedInOnly, (req, res) => {
    res.render('projets', {error: req.session.error})
})

router.get('/nouveau', loggedInOnly, (req, res) => {
    res.render('nouveau-projet', {project: null})
})

router.post('/nouveau', loggedInOnly, (req, res) => {
    ProjectManager.createProject(req.body, req.user._id).then(project => {
        res.render('nouveau-projet', {project, success: "Votre Projet a été créé"})
        // TO DO
        // res.redirect('projets/' + project._id)
    })
    .catch(err => res.render('nouveau-projet', {project}))
})

router.get('/:id', )

module.exports = router