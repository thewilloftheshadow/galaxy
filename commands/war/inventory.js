const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let items = re.dbs.users.get(message.guild.id+"."+message.author.id+".inventory")
  if(!items){
    re.dbs.users.set(message.guild.id+"."+message.author.id+".inventory", {})
    items = {}
  }
  let embeds = [new re.Discord.MessageEmbed().setTitle("Your Inventory").setAuthor(message.author.tag, message.author.avatarURL())]
  
  for(let itemid in items){
    let item = re.dbs.items.get(message.guild.id+"."+itemid)
    
    if(!item.hidden && items[itemid] > 0){
      if (embeds[embeds.length-1].fields.length == 6)
        embeds.push(new re.Discord.MessageEmbed().setTitle("Your Inventory").setAuthor(message.author.tag, message.author.avatarURL()))
      // console.log(fn.getEmoji(client, (item.emoji ? item.emoji : item.name)))
      embeds[embeds.length - 1].addField(
        `\`${item.id}\` - ${item.name}`, `Amount: ${items[itemid]} ${item.damage ? `| Damage: ${item.damage}` : ""} ${item.heal ? `| Heal: ${item.heal}` : ""} ${item.addhealth ? `| Health Boost: ${item.addhealth}` : ""}`
      )
      }
    }
    
    for (var [i, embed] of embeds.entries()) {
      embed.setFooter(`Page ${i + 1}/${embeds.length} | Check out the shop to get more items!`)
    }
    
    if(embeds[0].fields.length < 1) embeds[0].description = "There's nothing here! Go buy some items in the `%shop`."
  
    let m = await message.channel.send(embeds[0])
    re.func.paginator(message.author.id, m, embeds, 0)
};

module.exports.help = {
  name: "inventory",
  description: "See the items you have in your inventory",
  syntax: re.config.prefix + "inventory",
  alias: ["inv"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
