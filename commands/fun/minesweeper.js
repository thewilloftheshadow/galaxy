const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const minesweeper = new re.vars.minesweeper();
  message.channel.send(new re.Discord.MessageEmbed().setDescription(minesweeper.start()))
};

// module.exports.help = {
//   name: "minesweeper",
//   description: "Play Minesweeper on Discord!",
//   syntax: re.config.prefix + "minesweeper",
//   alias: ["mines"],
//   module: "fun",
//   access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
// };

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Play Minesweeper on Discord!`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["mines"],
    module:`${__dirname.split(`/`).pop()}`,
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
}