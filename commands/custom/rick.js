const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  message.channel.send("https://www.youtube.com/watch?v=j5a0jTc9S10")
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%rick\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Rick...",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["custom-695651396573200394b"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}
