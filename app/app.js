const express = require('express')
const session = require('express-session')
const path = require('path')
const exphbs  = require('express-handlebars');
const passport = require('passport')
const flash = require('connect-flash')

const SkillManager = require('./controllers/skill')
const ProjectManager = require('./controllers/project')
const ApplicationManager = require('./controllers/application')

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

// Pass General variables
app.use(async function(req, res, next) {
  res.locals.user = req.user
  res.locals.skillCategories = await SkillManager.getSkillsByCategory().then(skills => skills),
  res.locals.projectCategories = await ProjectManager.getProjectCategories().then(categories => categories)
  if (req.user) {
    let applications = await ApplicationManager.getUserApplications(req.user._id).then(application => application)
    res.locals.projectsApplied = applications.map(application => application.project_id)
    res.locals.noticeApplied = applications.filter(application => application.notice_id).map(application => application.notice_id)
  }
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