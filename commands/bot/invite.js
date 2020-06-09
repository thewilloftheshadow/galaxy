const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("<https://discord.com/api/oauth2/authorize?client_id=675500237875314732&permissions=2147483647&scope=bot>")
};

module.exports.help = {
  name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description:`Get a link to invite the bot!`,
  syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias:[],
  module:`${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}
