const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let mainmenu = new re.Discord.MessageEmbed()
  .setTitle("Galaxy Settings")
  .setColor(re.config.color)
  .setDescription("1️⃣ Bot Settings\n2️⃣ Unbelievaboat\n3️⃣ Role Settings\n4️⃣ Module Manager Settings\n❌ Exit Settings")
  .setFooter("Shut up JC ill make better emojis and stuff later")
  let botsettings = new re.Discord.MessageEmbed()
  .setTitle("Bot Settings")
  await m.edit(mainmenu)
  let emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","❌"]
  await m.react("1️⃣")
  await m.react("2️⃣")
  await m.react("3️⃣")
  await m.react("4️⃣")
  await m.react("❌")
  let reactions = await m
        .awaitReactions(
          (r, u) =>
            (["1️⃣","2️⃣","3️⃣","4️⃣","❌"].includes(r.emoji)) &&
            u.id == message.author.id,
          { time: 120 * 1000, max: 1, errors: ["time"] }
        )
        .catch(() => {})
      if (!reactions)
        return await m.delete().then(m => message.delete)
      let reaction = reactions.first().emoji
      await m.reactions.removeAll()
    if (reaction == "❌")
        return await m.delete().then(m => message.delete)
    if (reaction == "1️⃣"){
      m.edit
    }
  
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Setup the bot for your server`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 3, mm: null}
}