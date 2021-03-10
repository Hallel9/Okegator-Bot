const mongo = require('@util/mongo');
const warnSchema = require('@schemas/warn-schema')
const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
  commands: 'warn',
  minArgs: 2,
  expectedArgs: "<Target user's @> <reason>",
  permissions: ['MANAGE_MESSAGES'],
  permissionError: 'You need the **MANAGE_MESSAGES** permission to run this command!',
  description: 'Warns a user',
  callback: async (message, args) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to warn.')
      return
    }

    args.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = args.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )

        await new punishmentLogSchema({
          guildId,
          userId,
          command: message.content,
        }).save()

        message.reply(`${target.username} was warned for **${reason}** in **${message.guild}** guild id: **${guildId}**`)
      } catch (e) {
        console.log(e)
      }
    })
  },
}