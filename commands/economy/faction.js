const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let allfactions = re.dbs.factions.all()
};

module.exports.help = {
  name: "faction",
  description: "Get information about a faction",
  syntax: re.config.prefix + "faction <name>",
  alias: [],
  module: "economy",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
