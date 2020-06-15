const re = require(`../../resources.js`).data
const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  if(!args[0]) return message.channel.send("You must specify a user to ban")
  if(!args[1]) return message.channel.send("You must specify a reason for this ban")
  let reason = args.slice(1).join(" ");
  let user = re.func.getuser(args[0], message)
  if(user.id === re.config.ownerID || re.config.developers.includes(user.id)) return message.channel.send("You can't botban a developer! Its pointless anyway lmao")
  re.dbs.botban.set(user.id, reason)
  message.channel.send("Done! <@" + user + "> has been banned from Galaxy")
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Ban someone from the bot`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["reboot"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4, mm: null}
}