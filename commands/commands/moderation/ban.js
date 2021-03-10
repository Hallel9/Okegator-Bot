module.exports = {
    commands: 'ban',
    minArgs: 1,
    maxArgs: 1,
    permissions: ['BAN_MEMBERS'],
    expectedArgs: '<user>',
    permissionError: 'This command requires you to have the **BAN_MEMBERS** permission!',
    description: 'Bans a user',
    callback: (message, args, text) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${tag} That user has been banned!`)
        } 
     }
}