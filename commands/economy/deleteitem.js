const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let item = re.dbs.items.get(message.guild.id+"."+args[0])
  if(!item) return m.edit("That item doesn't exist!")
  
  
  await m.edit(`Are you sure you want to delete the ${item.name} permanently?`)
  await m.react("719817615358558258")
  await m.react("719817640213872670")
  let reactions = await m
        .awaitReactions(
          (r, u) =>
            (["719817615358558258","719817640213872670"].includes(r.emoji.id)) &&
            u.id == message.author.id,
          { time: 30 * 1000, max: 1, errors: ["time"] }
        )
        .catch(() => {})
      if (!reactions)
        return await m.edit("Prompt timed out")
      let reaction = reactions.first().emoji
      await m.reactions.removeAll()
      if (reaction.id != "719817615358558258") return await m.edit("Ok, we won't delete that item")
  
  re.dbs.items.delete(message.guild.id+"."+item.id)
  await m.edit(`Done! I've deleted the ${item.name} from the shop`)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Remove an item from the shop",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <itemid>`,
  alias: ["removeitem"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: "economy"}
}