const ownerId = ['241632903258177536', '645592347475836949'] // my discord user ID
const channelId = '809396307314999326' // private channel ID


function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}


module.exports = {
  commands: 'eval',
  description: 'Evaluates code',
  callback: async (message, args, text) => {
    const {
      member,
      channel,
      content
    } = message

    if (member.id === ownerId && channel.id === channelId) {
      try {
        const code = args.join(" ");
        if (!code) return message.channel.send('need code')


        message.channel.send(code.toString())




        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    } else {
      return message.channel.send('e not allowed')
    }
  }
}