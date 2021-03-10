module.exports = {
    commands: 'kick',
    minArgs: 1,
    maxArgs: 1,
    permissions: ['KICK_MEMBERS'],
    expectedArgs: '<user>',
    permissionError: 'This command requires you to have the **KICK_MEMBERS** permission!',
    description: 'Kicks a user',
    callback: (message, args, text) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag} That user has been kicked!`)
        } 
     }
}