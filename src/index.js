const app = require('./server.js')
const startMongo = require('./db/mongo.js')

const start = async () => {
    try {
        const port = await startMongo(app)
        console.log(`Server started on port ${port}`)
    } catch (err) {
        console.log(err)
    }
}

start()
