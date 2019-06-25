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

// Compte
const accountRouter = require('./account')
router.use('/account', accountRouter)

// Projet
const projetsRouter = require('./projets')
router.use('/projets', projetsRouter)

// Redirection
const redirectRouter = require('./redirect')
router.use('/redirect', redirectRouter)

module.exports = router