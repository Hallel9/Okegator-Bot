module.exports = {
    commands: 'hasrole',
    minArgs: 2,
    expectedArgs: "<Target user's @> <The role name>",
    permissions: 'MANAGE_ROLES',
    description: 'Says if the tagged user has a specific role or not.',
    callback: (message, args) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply('Please specify someone to remove a role from')
            return
        }

        args.shift()

        const roleName = args.join(' ')
        const {
            guild
        } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })

        if (!role) {
            message.reply(`There is no role with the name "${roleName}"!`)
            return
        }

        const member = guild.members.cache.get(targetUser.id)

        if (member.roles.cache.get(role.id)) {
            message.reply(`That user has the "${roleName}" role.`)
        } else {
            message.reply(`That user does not have the "${roleName}" role.`)
        }
    }
}