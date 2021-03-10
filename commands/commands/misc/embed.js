const Discord = require('discord.js')
module.exports = {
    commands: 'embed',
    minArgs: 0,
    maxArgs: 0,
    description: 'Sends an example embed',
    callback: (message, arguments, text) => {
        const logo = 'https://blog.hubspot.com/hubfs/image8-2.jpg'
        const embed = new Discord.MessageEmbed()
            .setTitle('Example Text Embed')
            .setURL('https://google.com')
            .setAuthor(message.author.username)
            .setImage(logo)
            .setThumbnail(logo)
            .setFooter('Google is lit')
            .addField('Name', 'Value', true)
            .addField('Name2', 'Value2', true)
            .addField('Name3', 'Value3', true)
            .addField('Name4', 'Value4', true)
            .addField('Name5', 'Value5', true)
            .addField('Name6', 'Value6', true)
        message.channel.send(embed)
    },
  }