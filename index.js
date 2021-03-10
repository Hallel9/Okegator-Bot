require('module-alias/register')



const Discord = require('discord.js')
const {
  token,
  prefix
} = require('@root/config.json')
// Requiring Modules and packages
const client = new Discord.Client();

const guildId =  '801174097832050758'

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id)
  if (guildId) {
    app.guilds(guildId)
  }
  return app
}
// Requiring files
const poll = require('@features/poll')
const sendMessage = require('@util/send-message')
const mongo = require('@util/mongo')
const loadCommands = require('@root/commands/load-commands')
const advancedPolls = require('@features/advanced-polls')
const command = require('@util/command')
const commandBase = require('@root/commands/command-base')
client.on('ready', async () => {
  console.log(`${client.user.username} has successfully logged in with a prefix of ${prefix} !`)
  client.user.setActivity(`${prefix}help`, {
    type: 'LISTENING',
    url: 'https://twitch.tv/test'
  })

  // Imports for js files within the same directory as this file.
  poll(client)
  loadCommands(client)
  advancedPolls(client)
  // sendMessage(client)
  commandBase.loadPrefixes(client)


  const guild = client.guilds.cache.get('801174097832050758')
  const channel = guild.channels.cache.get('818572223299846155')

  await mongo().then(mongoose => {
    try {
      console.log('Connected to mongo!')
    } catch (e) {
      console.log(e)
      channel.send(`There was an error! ${e}`)
    }
  })
})
client.login(token)