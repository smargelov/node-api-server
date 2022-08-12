require('dotenv').config()
const express = require('express')
const authRouter = require('./routers/authRouter.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)

module.exports = app
