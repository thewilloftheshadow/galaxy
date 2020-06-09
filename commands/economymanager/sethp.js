const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getuser(args.join(" "), message)
  let hp = re.dbs.users.get(message.guild.id+"."+user.id+".hp")
  if(!hp) {
    hp = 50
    re.dbs.users.set(user+".hp", 50)
  }
  let newhp = 0
  if(args[1] == "default"){ newhp = 50 } else { newhp = parseInt(args[1], 10) }
  let hpemoji = re.func.hpemoji(newhp)
  re.dbs.users.set(message.guild.id+"."+user+".hp", newhp)
  message.channel.send(`You have set ${user.user.tag}'s HP from ${hp} HP to ${newhp} HP\n${hpemoji}`)
};

module.exports.help = {
  name: "sethp",
  description: "Set someone's hp",
  syntax: re.config.prefix + "sethp <user> <amount>",
  alias: ["sethealth"],
  module: "economymanager",
  access: {staff: false, mod: false, ecomanage: true, dev: false, owner: false}
};
module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Set someone's hp",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user> <amount>`,
  alias: ["sethealth"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: "economy"}
}