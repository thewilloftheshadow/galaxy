const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  re.func.stats()
  message.react("✅")
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Update the stat channels",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["updatestats"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 1, mm: null}
}