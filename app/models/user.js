const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    date_of_birth: Date,
    creation: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean,
        default: false
    }
})
userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};


module.exports = mongoose.model('user', userSchema)