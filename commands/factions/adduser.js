const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  let f
  if(message.member.roles.cache.has("712297438014078986")) f = re.dbs.factions.get("mf")
  if(message.member.roles.cache.has("712709938161647748")) f = re.dbs.factions.get("pakistan")
  if(message.member.roles.cache.has("712783175306444910")) f = re.dbs.factions.get("at")
  
  if(!f) return await m.edit(`You aren't in a faction!`)
  
  
};

module.exports.help = {
  name: "adduser",
  description: "Add a user to your faction",
  syntax: re.config.prefix + "add <user>",
  alias: ["addmember"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};