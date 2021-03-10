module.exports = {
    commands: ['clearchannel', 'cc'],
    permissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
    permissionError: 'You need the **MANAGE_MESSAGES** and the **MANAGE_CHANNELS** permissions to run this command!',
    description: 'Clears messages from a channel in which the command is run in. (THIS IS NOT A PURGE COMMAND)',
    callback: (message) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
          })
    }
}