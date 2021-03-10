const loadCommands = require('../../load-commands')
const { MessageEmbed } = require('discord.js')
const {
    prefix
} = require('../../../config.json')
module.exports = {
    commands: ['help', 'cmds', 'h'],
    description: 'Describes all of the bot\'s commands',
    callback: async (message, arguments, text) => {
        let reply = 'Here are my supported commands:\n\n'

        const commands = loadCommands()

        for (const command of commands) {
            let permissions = command.permission

            if (permissions) {
                let hasPermission = true
                if (typeof permissions === 'string') {
                    permissions = [permissions]
                }

                for (const permission of permissions) {
                    if (!message.member.hasPermission(permission)) {
                        hasPermission = false
                        break
                    }
                }

                if (!hasPermission) {
                    continue
                }
            }

            // Format the text
            const mainCommand = typeof command.commands === 'string' 
            ? command.commands 
            : command.commands[0]
        const args = command.expectedArgs ? ` ${command.expectedArgs}`: ''
        const { description } = command

        reply += `**${mainCommand}${args}** = \`${description}\`\n`
        }
            const HelpEmbed = new MessageEmbed()
                .setDescription(reply)
                .setTimestamp()
                .setColor('#e3b81e')
                .setFooter('Commands are in bold and command descriptions are in code blocks.')
        message.channel.send(HelpEmbed)
    }
}