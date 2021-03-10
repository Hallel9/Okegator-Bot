const Discord = require('discord.js')
module.exports = {
    commands: 'serverinfo',
    minArgs: 0,
    maxArgs: 0,
    description: 'Replies with information about the server that the command is run in',
    callback: (message, arguments, text) => {
        const { guild } = message
        // console.log(guild)

        const { name, region, memberCount, large, afkTimeout, owner, createdAt, joinedAt, premiumSubscriptionCount, premiumTier } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
            {
                name: 'Guild Name',
                value: name,
            }, 
            {
                name: 'Region',
                value: region,
            }, 
            {
                name: 'Members',
                value: memberCount,
            }, 
            {
                name: 'Large?',
                value: large,
            }, 
            {
                name: 'afkTimeout',
                value: afkTimeout / 60,
            }, 
            {
                name: 'Owner',
                value: owner.user.tag,
            }, 
            {
                name: 'Created',
                value: createdAt,
            },
            {
                name: 'Boosts',
                value: premiumSubscriptionCount,
            },
            {
                name: 'Server Level',
                value: premiumTier,
            }
        )
        message.channel.send(embed)
    },
  }