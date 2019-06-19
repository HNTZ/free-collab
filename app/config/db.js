const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/free-collab', {useNewUrlParser: true})

// Connection a la DB
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected succesfuly to db')
})

module.exports = db