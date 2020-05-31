const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("https://discord.gg/Hr62m5X")
};

module.exports.help = {
  name: "support",
  description: "Get a link to the bot's support server!",
  syntax: re.config.prefix + "support",
  alias: ["server"],
  module: "bot",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
