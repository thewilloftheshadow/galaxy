const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  message.channel.send(args.join(" "))
};

module.exports.help = {
  name: "say",
  description: "Says a message as the bot",
  syntax: re.config.prefix + "say <message>",
  alias: ["copy"],
  module: "staff",
  access: {staff: true, mod: false, ecomanage: false, dev: true, owner: false}
};
