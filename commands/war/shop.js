const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let items = re.dbs.items.all()
  let embeds = [new re.Discord.MessageEmbed().setTitle("War Shop")]
  
  items.forEach(shopitem => {
    let item = JSON.parse(shopitem.data)
    if(!item.hidden){
      if (embeds[embeds.length-1].fields.length == 10)
        embeds.push(new re.Discord.MessageEmbed().setTitle("War Shop"))
      if (embeds[embeds.length-1].fields.length == 10)
        embeds.push(new re.Discord.MessageEmbed().setTitle("War Shop"))
      // console.log(fn.getEmoji(client, (item.emoji ? item.emoji : item.name)))
      embeds[embeds.length - 1].addField(
        `\`${item.id}\` - ${item.name}`, `> ${item.damage ? `Damage: ${item.damage}` : item.heal ? `Heal: ${item.heal}` : item.addhealth ? `Health Boost: ${item.addhealth}` : "No data"}`
      )
      }
    })
    
    for (var [i, embed] of embeds.entries()) {
      embed.setFooter(`Page ${i + 1}/${embeds.length} | Buy the items with \`${re.config.prefix}buy [item] [amount]\`!`)
    }
    
    let m = await message.channel.send(embeds[0])
    re.func.paginator(message.author.id, m, embeds, 0)
};

module.exports.help = {
  name: "shop",
  description: "List all items in the shop",
  syntax: re.config.prefix + "shop",
  alias: ["warshop"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
