const router = require('express').Router()
const {loggedInOnly} = require('../middleware')
const ApplicationManager = require('../controllers/application')

router.get('/', loggedInOnly, async (req, res) => {
    await ApplicationManager.getUserApplications(req.user._id).then((applications) => {
        res.render('candidatures', {applications})
    })
})

module.exports = router