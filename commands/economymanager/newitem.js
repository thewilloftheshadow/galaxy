const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let item = {
    name: "",
    id: "",
    price: "",
    damage: 0,
    heal: 0,
    addhealth: 0,
    effects: []
  }

  while (!item.name) {
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
    if (!input)
      return await message.author.send(new m.edit("Prompt timed out."))
    input = input.first().content
    item.name = input
    
  }
  item.id = item.name.replace(" ", "-")
  message.channel.send(JSON.stringify(item, null, 4), {code: "fix"})
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
