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
            skills: typeof User.skills === 'object' ? User.skills : [User.skills],
            ...User,
        })
        return NewUser.save()
    }

    static update(User) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ username: User.username }, function(err, user) {
                if (!user.validPassword(User.password)) {
                    return reject({msg: 'Mot de passe incorrect'})
                }
                else {
                    UserModel.updateOne({username: user.username}, {
                        $set: {
                            firstname: User.firstname,
                            lastname: User.lastname,
                            date_of_birth: new Date(User.date_of_birth),
                            skills: typeof User.skills === 'object' ? User.skills : [User.skills],
                        }
                    }).then((result) => {
                        if (!result.ok) {
                            return reject({ msg: 'Une erreur a eu lieu au cours de la mise a jour.' })
                        }
                        else {
                            return resolve({success: true})
                        }
                    })
                }
            })
        })
    }

    static async getUserName(_id) {
        return await UserModel.findOne({_id}).then(user => `${user.username} (${user.firstname} ${user.lastname})`)
    }
}

module.exports = UserManager