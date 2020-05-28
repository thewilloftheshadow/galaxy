const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(re.func.clean(evaled), {code:"xl", "split": " "});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${re.func.clean(err)}\n\`\`\``);
    }
};

module.exports.help = {
  name: "eval",
  description: "Execute some code",
  syntax: re.config.prefix + "eval <code>",
  alias: ["execute"],
  module: "dev",
  access: {staff: false, mod: false, ecomanage: false, dev: true, owner: false}
};
