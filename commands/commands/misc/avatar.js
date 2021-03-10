const Discord = require("discord.js");

module.exports = {
  commands: ["avatar", "av"],
  description: "Sends the avatar of the user",
  callback: (message, arguments, text) => {
    const embed = new Discord.MessageEmbed();

    if (!message.mentions.users.first()) {
      embed.setTitle("Your Avatar:");
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      embed.setDescription("This is your avatar.");
      embed.setFooter(`Requested by ${message.author.username}`);
      embed.setColor("RANDOM");
      embed.setTimestamp();
      return message.channel.send(embed);
    } else {
      const user = message.mentions.users.first();
      embed.setTitle(`${user.tag}'s Avatar:`);
      embed.setThumbnail(user.displayAvatarURL({ dynamic: true }));
      embed.setDescription(`This is ${user.tag}'s avatar.`);
      embed.setColor("RANDOM");
      embed.setFooter(`Requested by ${message.author.username}`);
      embed.setTimestamp();
      return message.channel.send(embed);
    }
  },
};
