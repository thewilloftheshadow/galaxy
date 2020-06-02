const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)
  
  let item = re.dbs.items.get(args[0])
  let inv = re.dbs.users.get(message.author.id+".inventory")
  let user = await re.unb.getUserBalance(message.guild.id, message.author.id)
  if(!item) return m.edit("That item doesn't exist!")
  if(!inv[item.id] || inv[item.id] < 1) return m.edit("You don't have that item!")
  
  if(item.heal == 0) return m.edit("Sorry! Only health items are avaliable to use right now")
  
  await m.edit(`Are you sure you want to use 1 ${item.name}?`)
  await m.react("678023486618468363")
  await m.react("684155550728192019")
  let reactions = await m
        .awaitReactions(
          (r, u) =>
            (["678023486618468363","684155550728192019"].includes(r.emoji.id)) &&
            u.id == message.author.id,
          { time: 30 * 1000, max: 1, errors: ["time"] }
        )
        .catch(() => {})
      if (!reactions)
        return await m.edit("Prompt timed out")
      let reaction = reactions.first().emoji
      await m.reactions.removeAll()
      if (reaction.id != "678023486618468363") return await m.edit("Canceled")
  await m.reactions.removeAll()
  
  re.dbs.users.subtract(message.author.id+".inventory."+item.id, 1)
  re.dbs.users.add(message.author.id+".hp", item.heal)
  if(re.dbs.users.get(message.author.id+".hp") > 50) re.dbs.users.set(message.author.id+".hp", 50)
  await m.edit(`Success! You have used 1 ${item.name} and ${item.heal ? `healed for ${item.heal} HP` : ""}!`)
};

module.exports.help = {
  name: "use",
  description: "Use an item from your inventory",
  syntax: re.config.prefix + "buy <itemid>",
  alias: ["heal", "equip", "attack"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
