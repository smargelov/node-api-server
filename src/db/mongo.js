require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5050

const startMongo = async (app) => {
    try {
        await mongoose.connect(process.env.MONGO_HOST)
        await app.listen(PORT)
        console.log('Mongo is connected')
        return PORT
    } catch (err) {
        console.log(err)
    }
}

module.exports = startMongo
