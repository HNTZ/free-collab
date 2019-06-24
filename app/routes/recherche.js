const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('recherche')
})

module.exports = router