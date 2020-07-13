const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
  if(re.config.unbid.includes(message.author.id)) return m.edit(`Hey there! Here's how to setup a faction system for Unbelievaboat.\n1) Authorize Galaxy to manage your unbelievaboat economy: <https://unbelievaboat.com/applications/authorize?app_id=700441228038242304&guild_id=${message.guild.id}>\n` + 
          `2) Create an item in the shop for purchasing a faction\n 3) Set the reply message for the item to this:\n\`\`\`fix\n${message.prefix}createfaction {member.id} {server.id}\`\`\`4) Have users buy that item to get a faction!`)
  message.delete()  
  let memid = args[0]
  let serverid = args[1]
  let faction = {
    "name": "",
    "members": [
      memid
    ],
    "leader": memid,
    "id": ""
  }
  m.edit("What do you want to call your new faction?")
  let input = await m.channel
    .awaitMessages(msg => msg.author.id == memid, {
      time: 120 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await m.edit("Prompt timed out.")
  input2 = input.first()
  input = input.first().content
  faction.name = input
  input2.delete()

  faction.id = faction.name.toLowerCase().replace(/[^a-z0-9\_\-]/g, "")
  re.dbs.factions.set(`${serverid}.${faction.id}`, faction)
  re.dbs.users.set(`${serverid}.${memid}.faction`, faction.id)
  
  let f = faction
  let fmem = `<@${f.members.join(">\n<@")}>`
  
  let embed = new re.Discord.MessageEmbed()
  .setColor(0x30D5C8)
  .setTitle(f.name)
  embed.addField("Leader:", `<@${f.leader}>`, true) // .addField("Members:", fmem.map(x => `<@${x.user.id}>`))
  embed.addField("Members:", fmem)
  embed.addField("Faction Value:", "<a:TCKC_ThonkTriangle:678050031017918475> Calculating...")
  
  await m.edit(`Here is the information for ${f.name}:`, embed)
  
  let ids = f.members
  let v = 0;
  ids.forEach(async (id, index) => {
      
      let user = await re.unb.getUserBalance(m.guild.id, id);
      v += user.total;
      
      if(index === ids.length - 1) {
        embed.fields[embed.fields.length - 1] = {
          name:"Faction Value:",
          value:`${re.dbs.settings.get(message.guild.id+".unb.emoji")} ${v}`
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