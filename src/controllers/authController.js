const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const Role = require('../models/Role.js')

/**
 * Generate a JWT token for the user
 * @param {String} id
 * @param {Array} roles
 * @returns {String} token
 */
const generateAccessToken = (id, roles) => {
    return jwt.sign({id, roles}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors: errors.array()})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                res.status(400).json({message: 'Such a user already exists'})
            }
            const hashedPassword = await bcrypt.hash(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'User created'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }
            const accessToken = generateAccessToken(user._id, user.roles)
            return res.json({accessToken})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find({})
            return res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get User error'})
        }
    }

}

module.exports = new authController()
