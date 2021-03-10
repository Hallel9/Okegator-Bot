module.exports = {
    commands: ['deletechannel', 'delchannel', 'dc'],
    maxArgs: 1,
    expectedArgs: '<#channel>',
    permissions: 'MANAGE_CHANNELS',
    permissionError: 'You must have the **MANAGE_CHANNELS** permission to run this command!',
    description: 'Deletes channel in which the command is run in if a mentioned channel is not specified.',
    callback: (message, args, text) => {
        const channel = message.mentions.channels.first()

        if(!channel) {
            message.channel.delete()
        }

        if (channel) {
            channel.delete()
        }
    }
}