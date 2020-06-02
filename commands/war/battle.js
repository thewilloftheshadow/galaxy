const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user1 = message.member
  let user2 = re.func.getuser(args.join(" "), message)
  
};

module.exports.help = {
  name: "battle",
  description: "Battle another user",
  syntax: re.config.prefix + "hp",
  alias: ["health"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
