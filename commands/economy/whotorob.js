const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let lb = await re.allunb[message.guild.id].getGuildLeaderboard(message.guild.id, { sort: 'cash' })
    let m = await message.channel.send("Let's see who has the fattest wallet... <a:TCKC_ThonkTriangle:678050031017918475>")
    await re.func.sleep(5000)
    let user = lb[Object.keys(lb)[0]]
    m.edit(new re.Discord.MessageEmbed().setDescription(`I suggest you rob <@${user.user_id}>. They have <a:TCKC_MoneyBag:710609208286117898> ${user.cash} cash.`))
};

module.exports.help = {
  name: "whotorob",
  description: "Who does the bot think you should rob...",
  syntax: re.config.prefix + "whotorob",
  alias: [],
  module: "economy",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
