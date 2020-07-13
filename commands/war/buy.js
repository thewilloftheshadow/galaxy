const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)
  
  if(!args[1]) args[1] = "1"
  let item = re.dbs.items.get(message.guild.id+"."+args[0])
  let user = await re.unb.getUserBalance(message.guild.id, message.author.id)
  if(!item) return m.edit("That item doesn't exist!")
  
  if(item.price != 0) if(user.cash < item.price) return await m.edit(`You don't have enough cash on hand to buy this! You have ${re.func.prettyNumber(user.cash)}, but you need ${re.func.prettyNumber(item.price)}`)
  console.log(item, item.name, item.price)
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
  await m.reactions.removeAll()
  
  re.dbs.users.add(message.guild.id+"."+message.author.id+".inventory."+item.id, 1)
  if(item.price != 0) re.unb.editUserBalance(message.guild.id, message.author.id, {cash: 0 - item.price}, "Purchased " + item.name)
  await m.edit("Success! You have purchased 1 " + item.name + "!")
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Purchase an item from the shop",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <itemid>`,
  alias: ["purchase"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}