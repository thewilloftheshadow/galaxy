const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let hp = re.dbs.users.get(message.author.id+".hp")
  if(!hp) {
    hp = 50
    re.dbs.users.set(message.author.id+".hp", 50)
  }
  let hpemoji = re.func.hpemoji(hp)
  message.channel.send(`You have ${hp} HP\n${hpemoji}`)
};

module.exports.help = {
  name: "hp",
  description: "Check your HP",
  syntax: re.config.prefix + "hp",
  alias: ["health"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
