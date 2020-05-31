const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let embed = re.func.itemembed(args.join(" "))
  if(embed) message.channel.send(embed)
};

module.exports.help = {
  name: "iteminfo",
  description: "Get information on an item in the shop",
  syntax: re.config.prefix + "iteminfo",
  alias: ["ii"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
