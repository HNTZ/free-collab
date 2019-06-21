const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('recherche', {error: req.session.error})
    req.session.error = null
})

module.exports = router