const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://lucas:${porcess.env.PASS}@freecollab-k0wpo.mongodb.net/free-collab`, {useNewUrlParser: true, dbName: "free-collab"})

// Connection a la DB
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected succesfuly to db')
})

module.exports = db