const Router = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/authController.js')
const roleMiddleware = require('../middlewares/roleMiddleware.js')

const router = new Router()
const minPasswordLength = 8

router.post('/registration', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', `Password must be at least ${minPasswordLength} characters`)
        .isLength({min: minPasswordLength}),
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router
