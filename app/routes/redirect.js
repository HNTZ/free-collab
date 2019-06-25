const router = require('express').Router()

router.get('/:link', (req, res) => {
    let link = req.params.link
    if (!link.includes('http')) {
        link = 'https://' + link
    }
    res.status(301).redirect(link)
})

module.exports = router