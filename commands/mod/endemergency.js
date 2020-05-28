const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.get("694962620914204672")) return
    await message.react("688544088072650821")
    await message.channel.setRateLimitPerUser(0)
    await message.channel.updateOverwrite(message.guild.roles.cache.get("642219487197659139"), {
      SEND_MESSAGES: true
    }, 'Emergency ended by ' + message.author.tag);
    await re.func.sleep(5000)
    await message.channel.send(`The emergency lockdown has been ended by ${message.author} <a:TCKC_wumpus_thumbs_up:684410830800158746>`)
    re.dbs.cd.set("emergency", Date.now())
};

module.exports.help = {
  name: "endemergency",
  description: "End the emergency lockdown",
  syntax: re.config.prefix + "endemergency",
  alias: [],
  module: "staff",
  access: {staff: false, mod: true, ecomanage: false, dev: false, owner: false}
};
