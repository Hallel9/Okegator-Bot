const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw'],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  permissions: ['MANAGE_MESSAGES'],
  permissionError: 'You need the **MANAGE_MESSAGES** permission to run this command!',
  description: 'Lists a user\'s warnings',
  callback: async (message, args, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify a user to load the warnings for.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })

        let reply = `Previous warnings for <@${userId}>:\n\n`

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning

          reply += `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}"\n\n`
        }

        message.reply(reply)
      } catch (e) {
        console.log(e)
        message.reply(`<@${userId}> does not have any warnings`)
      }
    })
  },
}