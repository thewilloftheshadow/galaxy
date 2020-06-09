const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send(args.join(" ").replace(/(\r\n|\n|\r)/gm,"\n"), {"code": "fix", "split": " "})
};

module.exports.help = {
  name: "blockify",
  description: "Turn message into code block",
  syntax: re.config.prefix + "eval <code>",
  alias: ["execute"],
  module: "dev",
  access: {staff: false, mod: false, ecomanage: false, dev: true, owner: false}
};
module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Turn message into code block",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <message<`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 5, mm: null}
}