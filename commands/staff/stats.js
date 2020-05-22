const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  re.func.stats()
  message.react("✅")
};

module.exports.help = {
  name: "stats",
  description: "Says a message as the bot",
  syntax: re.config.prefix + "stats",
  alias: ["updatestats"],
  module: "staff",
  access: {staff: true, mod: false, ecomanage: false, dev: false, owner: false}
};
