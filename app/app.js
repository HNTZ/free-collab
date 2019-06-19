const express = require('express')
const path = require('path')
const db = require('./config/db')
const session = require('express-session')

const app = express()

// Body parser
app.use(express.urlencoded({extended: true}))

// Session
app.use(session({secret: 'buu', saveUninitialized: false, resave: false}))

// Static
app.use(express.static(path.join(__dirname, '/public/assets')))

// Routes
const rootRoute = require('./routes/index')
app.use('/', rootRoute)

// Handlebars templating
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

const PORT = 3000
app.listen(PORT, () => console.log('server running on port ' + PORT)) 