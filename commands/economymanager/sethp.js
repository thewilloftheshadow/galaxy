const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getUser(args.join(" "), message)
  let hp = re.dbs.users.get(user.id+".hp")
  if(!hp) {
    hp = 50
    re.dbs.users.set(user+".hp", 50)
  }
  let hpemoji = re.func.hpemoji(hp)
  let newhp = parseInt(args[1], 10)
  re.dbs.users.set(user+".hp", newhp)
  message.channel.send(`You have set ${user.user.tag}'s HP from ${hp} HP to ${newhp} HP\n${hpemoji}`)
};

module.exports.help = {
  name: "sethp",
  description: "Set someone's hp",
  syntax: re.config.prefix + "sethp <user> <amount>",
  alias: ["health"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: true, dev: false, owner: false}
};
