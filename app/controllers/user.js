const UserModel = require('../models/user')
const mongoose = require('mongoose')

class UserManager {
    
     static async usernameExists(username) {
        const count = await UserModel.countDocuments({username})
            .exec()
            .then(users => users)
        if (count > 0) 
            return true
        else 
            return false
    }

    static async emailExists(email) {
        const count = await UserModel.countDocuments({email})
            .exec()
            .then(users => users)
        if (count > 0) 
            return true
        else 
            return false
    }

    static register(User) {
        let NewUser = new UserModel({
            _id: mongoose.Types.ObjectId(),
            date_of_birth: new Date(User.date_of_birth),
            ...User,
        })
        return NewUser.save()
    }
}

module.exports = UserManager