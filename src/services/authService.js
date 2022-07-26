const bcrypt = require('bcryptjs')
const User = require('../models/User.js')
const Role = require('../models/Role.js')

class AuthService {
    async isUserAlreadyExist(username) {
        try {
            return  await User.findOne({username})
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async addUserToDb(username, password, role) {
        try {
            const hashedPassword = await bcrypt.hash(password, 7)
            const userRole = await Role.findOne({value: role})
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return user
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async getUsersFromDb() {
        try {
            return await User.find({})
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = new AuthService()
