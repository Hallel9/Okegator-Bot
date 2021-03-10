module.exports = {
    commands: 'giverole',
    minArgs: 2,
    expectedArgs: "<Target user's @> <The role name>",
    permissions: 'MANAGE_ROLES',
    description: 'Gives a user a role',
    callback: (message, args) => {
        const targetUser = message.mentions.users.first()
        if(!targetUser) {
            message.reply('Please specify someone to give a role to')
            return
        }
        
        args.shift()

        const roleName = args.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })

        if(!role) {
            message.reply(`There is no role with the name "${roleName}"`)
            return
        }

        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)

        message.reply(`That user now has the "${roleName}" role`)
    }
}