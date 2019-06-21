const express = require('express')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')

require('./config/db')
require('./config/passportConfig')

const app = express()

// Body parser
app.use(express.urlencoded({extended: true}))

// Static
app.use(express.static(path.join(__dirname, '/public/assets')))

// Session
app.use(session({
    secret: 'keyboard cat'
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// Routes
const rootRoute = require('./routes/index')
app.use('/', rootRoute)

// Handlebars templating
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

const PORT = 3000
app.listen(PORT, () => console.log('server running on port ' + PORT)) 