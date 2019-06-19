const express = require('express')
const router = express.Router()

// Page d'accueil
router.get('/', (req, res) => {
    res.render('index')
})

// Contact
router.get('/contact', (req, res) => {
    res.render('contact')
})

// Search
router.get('/search', (req, res) => {
    res.render('search', {error: req.session.error})
    req.session.error = null
})

module.exports = router