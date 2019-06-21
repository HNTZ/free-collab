const express = require('express')
const session = require('express-session')
const path = require('path')
const exphbs  = require('express-handlebars');
const passport = require('passport')
const flash = require('connect-flash')
const SkillManager = require('./controllers/skill')

require('./config/db')
require('./config/passportConfig')

const app = express()

// Body parser
app.use(express.urlencoded({extended: true}))

// Static
app.use(express.static(path.join(__dirname, '/public/assets')))

// Session
app.use(session({
    secret: 'petit jean luc',
    resave: true,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Pass the user to all templates
app.use(async function(req, res, next) {
  res.locals.user = req.user
  res.locals.skillCategories = await SkillManager.getSkillsByCategory().then(skills => skills)
  next();
});

// Routes
const rootRoute = require('./routes/index')
app.use('/', rootRoute)

// Handlebars templating
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers') //only need this
}));
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

const PORT = 3000
app.listen(PORT, () => console.log('server running on port ' + PORT)) 