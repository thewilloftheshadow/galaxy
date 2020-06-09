const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("https://discord.gg/Hr62m5X")
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Get a link to the bot's support server`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 3, mm: null}
}
