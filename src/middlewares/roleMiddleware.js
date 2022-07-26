const jwt = require('jsonwebtoken')
module.exports = (roles) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: 'User not authorized'})
            }
            const {roles: userRoles} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            let hasRole = false
            userRoles.forEach(userRole => {
                if (roles.includes(userRole)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: 'Not permitted for this user role'})
            }
            next()
        } catch (e) {
            return res.status(403).json({message: 'Unauthorized'})
        }
    }
}
