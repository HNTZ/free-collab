const router = require('express').Router()

// Accueil
const accueilRouter = require('./accueil')
router.use('/', accueilRouter)

// Contact
const contactRouter = require('./contact')
router.use('/contact', contactRouter)

// Recherche
const rechercheRouter = require('./recherche')
router.use('/recherche', rechercheRouter)

// Connexion
const authRouter = require('./auth')
router.use('/auth', authRouter)

module.exports = router