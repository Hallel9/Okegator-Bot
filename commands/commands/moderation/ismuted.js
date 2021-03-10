const muteSchema = require('@schemas/mute-schema')
const { MessageEmbed } = require('discord.js')
module.exports = {
    commands: 'ismuted',
    permissions: 'MANAGE_ROLES',
    description: 'Says whether a user is muted or not and who muted the user',
    callback: async (message, args) => {
        if (args.length !== 1) {
            message.reply('Please use the correct syntax: ${prefix}ismuted <User ID>')
            return
        }

        const id = args[0]

        const members = await message.guild.members.fetch()
        const target = members.get(id)
        const isInDiscord = !!target

        const currentMute = await muteSchema.findOne({
            userId: id,
            guildId: message.guild.id,
            current: true
        })

        const embed = new MessageEmbed()
            .setAuthor(`Mute Info for ${target ? target.user.tag : id}`, target ? target.user.displayAvatarURL : '')
            .addField('Currently muted', currentMute ? 'Yes' : 'No')
            .addField('Is In Discord', isInDiscord ? 'Yes' : 'No')

            if (currentMute) {
                const date = new Date(currentMute.expires)


                embed.addField('Muted by', `<@${currentMute.staffId}>`)
                .addField('Muted for', currentMute.reason.toLowerCase())
                .addField('Mute expires', `${date.toLocaleString()} EST`)
            }
        message.reply(embed)
    }
}