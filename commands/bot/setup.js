const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  if(!message.member.hasPermission("MANAGE_SERVER")) return await message.channel.send("Only someone with the `Manage Server` permission can setup the bot!")
  if(re.dbs.settings.get(message.guild.id+".setup")){
    await m.edit(`Are you sure you want to add <@${user.id}> to your faction?`)
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
      if (reaction.id != "678023486618468363") return await m.edit("Ok, I won't add them then")
  }
  let settings = require("/app/defaults.json")

  let m.edit = await message.channel.send(
    "Yay its time to make a new item! What do you want to call this item?"
  )
  let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  item.name = input

  item.id = item.name.toLowerCase().replace(/ /g, "")

  // m = await message.channel.send("How much should this item cost?")
  await m.edit("How much should this item cost?")
  input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  item.price = parseInt(input, 10)

  // m = await message.channel.send("How much should this item damage?")
  await m.edit("How much should this item damage?")
  input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  item.damage = parseInt(input, 10)

  // m = await message.channel.send("How much should this item heal?")
  await m.edit("How much should this item heal?")
  input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  item.heal = parseInt(input, 10)

  // m = await message.channel.send("How much health should this item add?")
  await m.edit("How much health should this item add?")
  input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  item.addhealth = parseInt(input, 10)

  message.channel.send(JSON.stringify(item, null, 4), { code: "fix" })
  re.dbs.items.set(message.guild.id+"."+item.id, item)
}

module.exports.help = {
  name: "newitem",
  description: "Add an item to the shop",
  syntax: re.config.prefix + "additem",
  alias: ["createitem"],
  module: "economymanager",
  access: {
    staff: false,
    mod: false,
    ecomanage: true,
    dev: false,
    owner: false
  }
}
