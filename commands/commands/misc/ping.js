module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    description: 'Displays how long it took the bot to run the command',
    callback: (message, arguments, text, client) => {
      message.reply('Calculating ping...').then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        resultMessage.edit(`Pong! Bot Latency: ${ping}, API Latency: ${client.ws.ping}`)
      }) 
    },
  }