const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let lb = await re.unb.getGuildLeaderboard(message.guild.id, { sort: 'cash' })
    let m = await message.channel.send("Let's see who has the fattest wallet... <a:TCKC_ThonkTriangle:678050031017918475>")
    await re.func.sleep(5000)
    let user = lb.users[0]
    m.edit(new re.Discord.MessageEmbed().setDescription(`I suggest you rob <@${user.user_id}>. They have ${re.dbs.settings.get(message.guild.id+".unb.emoji") ? re.dbs.settings.get(message.guild.id+".unb.emoji") : "<a:TCKC_MoneyBag:710609208286117898>"}${user.cash} cash.`))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Who does the bot think you should rob...",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}