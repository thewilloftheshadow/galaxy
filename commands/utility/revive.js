const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {

    let lastping = re.dbs.cd.get(message.guild.id+".revive")
    if((lastping + 7200000) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + require("ms")((lastping + 3600000) - Date.now()))
    let dc = message.guild.roles.cache.get("667442636252250112")
    if(!dc) return message.channel.send("Error: no role found")
    await dc.setMentionable(true)
    await message.react("688544088072650821")
    await re.func.sleep(5000)
    await message.channel.send("Ping pong <@&" + dc.id + ">!")
    await dc.setMentionable(false)
    re.dbs.cd.set(message.guild.id+".revive", Date.now())
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Revive a dead chat!",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}