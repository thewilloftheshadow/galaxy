const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
  let items = re.dbs.users.get(message.author.id+".inventory")
  if(!items){
    re.dbs.users.set(message.author.id+".inventory", [])
    items = []
  }
  let embeds = [new re.Discord.MessageEmbed().setTitle("Your Inventory").setAuthor(message.author.tag, message.author.avatarURL())]
  
  items.forEach(itemid => {
    let item = JSON.parse(re.dbs.items.get(itemid))
    if(!item.hidden){
      if (embeds[embeds.length-1].fields.length == 6)
        embeds.push(new re.Discord.MessageEmbed().setTitle("Your Inventory").setAuthor(message.author.tag, message.author.avatarURL()))
      // console.log(fn.getEmoji(client, (item.emoji ? item.emoji : item.name)))
      embeds[embeds.length - 1].addField(
        `\`${item.id}\` - ${item.name}`, `${item.damage ? `| Damage: ${item.damage}` : ""} ${item.heal ? `| Heal: ${item.heal}` : ""} ${item.addhealth ? `| Health Boost: ${item.addhealth}` : ""}`
      )
      }
    })
    
    for (var [i, embed] of embeds.entries()) {
      embed.setFooter(`Page ${i + 1}/${embeds.length} | Check out the shop to get more items!\`!`)
    }
    
    if(embeds[0].fields.length < 1) embeds[0].description = "There's nothing here! Go buy some items in the shop."
  
    let m = await message.channel.send(embeds[0])
    re.func.paginator(message.author.id, m, embeds, 0)
};

module.exports.help = {
  name: "buy",
  description: "Purchase an item from the shop",
  syntax: re.config.prefix + "buy <itemid>",
  alias: ["purchase"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
