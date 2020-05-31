const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let item = re.dbs.users.get(message.author.id+".inventory")
  
  
};

module.exports.help = {
  name: "buy",
  description: "Purchase an item from the shop",
  syntax: re.config.prefix + "buy <itemid>",
  alias: ["purchase"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
