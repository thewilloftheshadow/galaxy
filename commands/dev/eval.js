const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const die = "🔪🔫"
  
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
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Execute some code",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["execute"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}