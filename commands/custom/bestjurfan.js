const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  message.channel.send("<:TCKC_LMAO:702975077825642496> Jurfan is cool")
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%bestjurfan\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
};

module.exports.help = {
  name: "bestjurfan",
  description: "Jurfan is the best",
  syntax: re.config.prefix + "bestjurfan",
  alias: ["custom-425358025558327297"],
  module: "custom",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
