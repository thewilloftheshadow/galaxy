const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
  let allfactionsdb = re.dbs.factions.all()
  let allf = []
  allfactionsdb.forEach(x => allf.push(x.ID))
  let f = re.dbs.factions.get((args.join(" ") || "abcdefghijklmnopqrstuvwxyz"))
  if(!f) return await m.edit(`That faction was not found! Here are all the factions in the server:\n**${allf.join("**, **")}**`)
  
  let fmem = message.guild.members.cache.filter(x => x.roles.cache.has(f.ids.role))
  let value = 0
  await fmem.forEach(async x => {
    let unbuser = await re.unb.getUserBalance(message.guild.id, x.user.id)
    console.log(x, unbuser)
    value += unbuser.total
  })
  
  await re.func.sleep(10)
  
  let embed = new re.Discord.MessageEmbed()
  .setColor(0x30D5C8)
  .setTitle(f.name)
  .addField("Channel:", `<#${f.ids.channel}>`, true)
  .addField("Role:", `<@&${f.ids.role}>`, true)
  .addField("Members:", fmem.map(x => `<@${x.user.id}>`))
  .addField("Faction Value:", value)
  
  await m.edit("Here is the information for " + f.name + ":", embed)
};

module.exports.help = {
  name: "faction",
  description: "Get information about a faction",
  syntax: re.config.prefix + "faction <name>",
  alias: [],
  module: "economy",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
