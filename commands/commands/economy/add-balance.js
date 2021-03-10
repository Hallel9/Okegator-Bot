const economy = require('@features/economy')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <coin amount>",
    permissionError: 'You must be an admin to run this command!',
    permissions: 'ADMINISTRATOR',
    description: 'Adds a balance to users',
    callback: async (message, args) => {
        const mention = message.mentions.users.first()

        if(!mention) {
           message.reply('Please tag a user to add coins to.')
           return 
        }

        const coins = args[1]
        if (isNaN(coins)) {
            message.reply('Please provide a valid number of coins')
            return
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.reply(`You have given <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)!`)
    }
}