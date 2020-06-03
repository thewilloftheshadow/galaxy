const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let items = re.dbs.items.get(message.guild.id)
  let embeds = [new re.Discord.MessageEmbed().setTitle("War Shop")]
  
  for(let shopitem in items){
    let item = JSON.parse(items[shopitem])
    if(!item.hidden){
      if (embeds[embeds.length-1].fields.length == 6)
        embeds.push(new re.Discord.MessageEmbed().setTitle("War Shop"))
      // console.log(fn.getEmoji(client, (item.emoji ? item.emoji : item.name)))
      embeds[embeds.length - 1].addField(
        `\`${item.id}\` - ${item.name}`, `Price: <a:TCKC_MoneyBag:710609208286117898> ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${item.damage ? `| Damage: ${item.damage}` : ""} ${item.heal ? `| Heal: ${item.heal}` : ""} ${item.addhealth ? `| Health Boost: ${item.addhealth}` : ""}`
      )
      }
    }
    
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
