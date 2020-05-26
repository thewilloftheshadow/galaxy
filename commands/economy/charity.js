const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  if(!message.author.bot) return
  let amount
  while(!amount){
    
  }
};

module.exports.help = {
  name: "charity",
  description: "Donate your money to charity",
  syntax: re.config.prefix + "whotorob",
  alias: [],
  module: "economy",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false},
  nohelp: true
};
