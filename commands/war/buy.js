const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let item = re.dbs.users.get(message.author.id+".inventory")
  let user = await re.allunb[message.guild.id].getUserBalance(message.guild.id, message.author.id)
  
  if(user.cash < item.price) return await message.channel.send(`You don't have enough cash on hand to buy this! You have ${user.cash}, but you need ${re.func.prettyNumber(item.price}`)
  
};

module.exports.help = {
  name: "buy",
  description: "Purchase an item from the shop",
  syntax: re.config.prefix + "buy <itemid>",
  alias: ["purchase"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
