const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let embed = re.func.itemembed(args.join(" "))
  if(embed) message.channel.send(embed)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Get info for an item`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}