const MongoClient = require('mongoose')
const { mongoPath } = require('@root/config.json')

module.exports = async () => {
    const client = await MongoClient.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        keepAlive: true,
    })
    return client
}