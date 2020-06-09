const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const minesweeper = new re.vars.minesweeper();
  message.channel.send(new re.Discord.MessageEmbed().setDescription(minesweeper.start()))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Play Minesweeper on Discord!",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["mines"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}