const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const minesweeper = new re.vars.Minesweeper();
  message.channel.send(new re.Discord.MessageEmbed().setDescription(minesweeper.start()))
};

module.exports.help = {
  name: "minesweeper",
  description: "Play Minesweeper on Discord!",
  syntax: re.config.prefix + "say <message>",
  alias: ["mines"],
  module: "fun",
  access: {player: false, gm: true, dev: false}
};
