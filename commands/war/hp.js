const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let hp = re.dbs.users.get(message.guild.id+"."+message.author.id+".hp")
  if(!hp) {
    hp = 50
    re.dbs.users.set(message.guild.id+"."+message.author.id+".hp", 50)
  }
  let hpemoji = re.func.hpemoji(hp)
  message.channel.send(`You have ${hp} HP\n${hpemoji}`)
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Check your hp`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}