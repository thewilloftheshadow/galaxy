const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  let allf = re.dbs.factions.all()
  let f = ""
  console.log(allf)
  //if(!f) return await m.edit(`That faction was not found! Here are all the factions in the server:\n**${allf.join("**, **")}**`)
  
  
};

module.exports.help = {
  name: "faction",
  description: "Add a user to your faction",
  syntax: re.config.prefix + "add <user>",
  alias: ["addmember"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};