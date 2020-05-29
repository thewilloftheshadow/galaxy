const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
  let allfactionsdb = re.dbs.factions.all()
  let allf = []
  allfactionsdb.forEach(x => allf.push(x.ID))
  let f = re.dbs.factions.get((args.join(" ") || "abcdefghijklmnopqrstuvwxyz"))
  if(!f) return await m.edit(`That faction was not found! Here are all the factions in the server:\n**${allf.join("**, **")}**`)
  
  let fmem = message.guild.members.cache.filter(x => x.roles.cache.has(f.ids.role))
  
  let embed = new re.Discord.MessageEmbed()
  .setColor(0x30D5C8)
  .setTitle(f.name)
  .addField("Channel:", `<#${f.ids.channel}>`, true)
  .addField("Role:", `<@&${f.ids.role}>`, true)
  .addField("Leader:", `<@${f.leader}>`, true)
  .addField("Members:", fmem.map(x => `<@${x.user.id}>`))
  .addField("Faction Value:", "<a:TCKC_ThonkTriangle:678050031017918475> Calculating...")
  
  await m.edit("Here is the information for " + f.name + ":", embed)
  
  let ids = fmem.map(x => x.user.id)
  let v = 0;
  ids.forEach(async (id, index) => {
      
      let user = await re.unb.getUserBalance(m.guild.id, id);
      v += user.total;
      
      if(index === ids.length - 1) {
        embed.fields[embed.fields.length - 1] = {
          name:"Faction Value:",
          value:`<a:TCKC_MoneyBag:710609208286117898> ${v}`
        }
        return m.edit(embed);
      }
  })
};

module.exports.help = {
  name: "faction",
  description: "Get information about a faction",
  syntax: re.config.prefix + "faction <name>",
  alias: ["factions"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};