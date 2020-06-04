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
