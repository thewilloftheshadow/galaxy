const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("I HAVE NO FRICKING IDEA IM AS CONFUSED AS YOU ARE MAN")
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%how\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `How???`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["custom-533064726956081178"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}