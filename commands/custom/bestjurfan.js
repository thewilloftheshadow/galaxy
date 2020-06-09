const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  message.channel.send("<:TCKC_LMAO:702975077825642496> Jurfan is cool")
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%bestjurfan\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Jurfan is the best`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["custom-425358025558327297"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}