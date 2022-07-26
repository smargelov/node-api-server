require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter.js')
const PORT = process.env.PORT || 5050

const app = express()
app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_HOST)
        await app.listen(PORT)
        console.log(`Server started on port ${PORT}`)
    } catch (err) {
        console.log(err)
    }
}

start()
