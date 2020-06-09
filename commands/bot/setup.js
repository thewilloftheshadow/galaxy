const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let mainmenu = new re.Discord.MessageEmbed()
  .setTitle("Galaxy Settings")
  .setColor(re.config.color)
  .setDescription("1️⃣ Bot Settings\n2️⃣ Unbelievaboat\n3️⃣ Role Settings\n4️⃣ Module Manager Settings")
  await m.edit(mainmenu)
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Setup the bot for your server`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 3, mm: null}
}