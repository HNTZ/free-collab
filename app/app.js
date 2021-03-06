const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
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
var store = new MongoDBStore({
  uri: `mongodb+srv://lucas:${process.env.PASS}@freecollab-k0wpo.mongodb.net/free-collab`,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
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

// Chat
const http = require('http').Server(app)
const io = require('socket.io')(http)
io.on('connection', (socket) => {
  socket.username = 'Un utilisateur anonyme';
  socket.on('change username', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Serveur ', 'message': socket.username + ' a rejoint la conversation !'})
  })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => console.log('server running on port ' + PORT)) 