const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    passwordHash: String,
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
    },
    skills: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'skill'}
    ]
})

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};
  
UserSchema.virtual("password").set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 12);
});

module.exports = mongoose.model('user', UserSchema)