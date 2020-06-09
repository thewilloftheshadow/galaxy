const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  if(args.join(" ") === "") return
  message.channel.send(args.join(" "), {disableMentions: "all"})
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Say command used by ${message.author.tag}`).setDescription(`Message sent by <@${message.author.id}> in ${message.channel}:\n\`\`\`fix\n${args.join(" ")}\n\`\`\``))
};

module.exports.help = {
  name: "say",
  description: "Says a message as the bot and logs in <#700444125589405811>",
  syntax: re.config.prefix + "say <message>",
  alias: ["copy"],
  module: "staff",
  access: {staff: true, mod: false, ecomanage: false, dev: false, owner: false}
};
module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Says a message as the bot",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <message>`,
  alias: ["copy"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 1, mm: null}
}