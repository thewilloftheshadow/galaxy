const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let lastping = re.dbs.cd.get(message.guild.id+".emergency")
    if((/* lastping + 900000 */ 0) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + require('ms')((lastping + 900000) - Date.now()))
    let msr = message.guild.roles.cache.get("710567729245192233")
    let msr2 = message.guild.roles.cache.get("716434323057672223")
    if(!msr) return message.channel.send("Error: no role found")
    if(!msr2) return message.channel.send("Error: no role found")
    await msr.setMentionable(true)
    await message.react("688544088072650821")
    await message.channel.setRateLimitPerUser(21600)
    await message.channel.updateOverwrite(message.guild.roles.cache.get("642219487197659139"), {
      SEND_MESSAGES: false
    }, 'Emergency trigger by ' + message.author.tag);
    await re.func.sleep(5000)
    await message.channel.send(`<a:TCKC_DETECTED:685262432758792234> **EMERGENCY ALERT** <a:TCKC_DETECTED:685262432758792234>\n**------------------------**\n${msr} ${msr2} Please hurry as there is a emergency that was reported by ${message.author}.\n**------------------------**\n**Note:**\n*If this command was used for no reason, you will be warned*\n*Please do not test the command, as it pings all staff, and locks chat*\n\nStaff: use the command \`%endemergency\` to end the lockdown.`)
    await msr.setMentionable(false)
    re.dbs.cd.set(message.guild.id+".emergency", Date.now())
};

module.exports.help = {
  name: "emergency",
  description: "Trigger an emergency alert",
  syntax: re.config.prefix + "emergency",
  alias: [],
  module: "utility",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
