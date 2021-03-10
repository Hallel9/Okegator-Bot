module.exports = {
    commands: ['slow', 'slowmode'],
    description: 'Sets a slowmode for a channel',
    permissions: 'MANAGE_CHANNELS',
    permissionError: 'You need to have the **MANAGE_CHANNELS** permission to run this command.',
    callback: async (message, args) => {
        const {
            channel
        } = message

        if (args.length < 1) {
            message.reply('Please provide a duration')
            return
        }

        let duration = args.shift().toLowerCase()
        if (duration === 'off') {
            duration = 0
        }

        if (isNaN(duration)) {
            message.reply(
                'Please provide either a number of seconds or the word "off"'
            )
            return
        }

        channel.setRateLimitPerUser(duration, args.join(' '))
        message.reply(`The slowmode for this channel has been set to ${duration}`)

    }
}