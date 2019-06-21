const router = require('express').Router()
const passport = require('passport')
const { check, validationResult, body } = require('express-validator');
const UserManager = require('../controllers/user')
const {loggedOutOnly} = require('../middleware')

router.get('/login', loggedOutOnly, (req, res) => {
    res.render('login', {error: req.flash('error')})
})

router.post('/login', loggedOutOnly, passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true 
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/inscription', loggedOutOnly, (req, res) => {
    res.render('inscription')
})

router.post('/inscription', [
        check('email').isEmail().withMessage("Le format de votre email n'est pas bon."),
        check('password').isLength({min: 5}).withMessage("Votre message doit avoir au moins 5 caracteres."),
        body('email').custom(async value => {
            const users = await UserManager.emailExists(value) 
            if (users) {
                return Promise.reject('Cette adresse email est deja utilise')
            }
        }),
        body('username').custom(async value => {
            const users = await UserManager.usernameExists(value)
            if (users){
                return Promise.reject('Ce pseudo est deja utilise')
            }
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('inscription', {...req.body, errors: errors.array()})
        }
        else {
            UserManager.register(req.body).then(() => {
                passport.authenticate('local')(req, res, function () {
                    'Connecté'
                    res.redirect('/');
                })
            })
        }
})

module.exports = router