const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)
  
  let item = re.dbs.items.get(args[0])
  let user = await re.unb.getUserBalance(message.guild.id, message.author.id)
  if(!item) return m.edit("That item doesn't exist!")
  
  if(user.cash < item.price) return await m.edit(`You don't have enough cash on hand to buy this! You have ${re.func.prettyNumber(user.cash)}, but you need ${re.func.prettyNumber(item.price)}`)
  
  await m.edit(`Are you sure you want to buy 1 ${item.name}?`)
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
      if (reaction.id != "678023486618468363") return await m.edit("Purchase canceled")
  
  re.dbs.users.add(message.author.id+".inventory."+item.id, 1)
  re.unb.editUserBalance(message.guild.id, message.author.id, {cash: 0 - item.price}, "Purchased " + item.name)
  await m.reactions.removeAll()
  await m.edit("Success! You have purchased 1 " + item.name + "!")
};

module.exports.help = {
  name: "buy",
  description: "Purchase an item from the shop",
  syntax: re.config.prefix + "buy <itemid>",
  alias: ["purchase"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
