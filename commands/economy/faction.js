const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let allfactionsdb = re.dbs.factions.all()
  let allf = []
  allfactionsdb.forEach(x => allf.push(x.ID))
  let f = re.dbs.factions.get((args.join(" ") || "abcdefghijklmnopqrstuvwxyz"))
  if(!f) return message.channel.send(`That faction was not found! Here are all the factions in the server:\n**${allf.join("**, **")}**`)
  let embed = new re.Discord.MessageEmbed()
  .setColor(0x30D5C8)
  .setTitle(f.name)
  .addField("Channel:", `<#${f.ids.channel}>`, true)
  .addField("Role:", `<#${f.ids.role}>`, true)
  .addField("Members:", message.guild.members.cache.filter(x => x.roles.cache.has(f.ids.role)).map(x => `<@${message.author.id}>`))
  message.channel.send(embed)
};

module.exports.help = {
  name: "faction",
  description: "Get information about a faction",
  syntax: re.config.prefix + "faction <name>",
  alias: [],
  module: "economy",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
