module.exports = client => {
    const channelIds = [
        '818522226172493854', // test-channel
    ]
    const addReactions = message => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750)
    }
    client.on('message', async (message) => {
        if (channelIds.includes(message.channel.id)) {
            addReactions(message)
        }
    })
}