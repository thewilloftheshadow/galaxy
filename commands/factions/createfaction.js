const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
  if(message.author.id != re.config.unbid){
    m.edit(`Hey there! Here's how to setup faction system for Unbelievaboat.\n1) Authorize Galaxy to manage your unbelievaboat economy: https://unbelievaboat.com/applications/authorize?app_id=700441228038242304&guild_id=${message.guild.id}` + 
          `2) Create an item in the shop for purchasing a faction\n3) `)
  } else {
    
  }
  return;
  let allfactionsdb = re.dbs.factions.get(message.guild.id)
  if(!allfactionsdb){
    re.dbs.factions.set(message.guild.id, {})
    allfactionsdb = {}
  }
  let allf = Object.getOwnPropertyNames(allfactionsdb)
  let f = re.dbs.factions.get(message.guild.id+"."+(args.join(" ") || "abcdefghijklmnopqrstuvwxyz"))
  if(!allf) return await m.edit(`There are no factions in this server!`)
  if(!f) return await m.edit(`That faction was not found! Here are all the factions in the server:\n**${allf.join("**, **")}**`)
  
  let fmem2 = message.guild.members.cache.filter(x => x.roles.cache.has(f.ids.role))
  let fmem = `<@${f.members.join(">\n<@")}>`
  
  let embed = new re.Discord.MessageEmbed()
  .setColor(0x30D5C8)
  .setTitle(f.name)
  .addField("Channel:", `<#${f.ids.channel}>`, true)
  .addField("Role:", `<@&${f.ids.role}>`, true)
  .addField("Leader:", `<@${f.leader}>`, true) // .addField("Members:", fmem.map(x => `<@${x.user.id}>`))
  .addField("Members:", fmem)
  .addField("Faction Value:", "<a:TCKC_ThonkTriangle:678050031017918475> Calculating...")
  
  await m.edit("Here is the information for " + f.name + ":", embed)
  
  let ids = fmem2.map(x => x.user.id)
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
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Get information on how to setup a faction system",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <name>`,
  alias: ["sect"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}