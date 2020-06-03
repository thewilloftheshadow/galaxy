const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let item = {
    name: "",
    id: "",
    price: 0,
    damage: 0,
    heal: 0,
    addhealth: 0,
    effects: []
  }

  let m = await message.channel.send(
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
