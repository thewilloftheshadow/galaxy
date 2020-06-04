const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)
  
  let user1 = message.member
  let user2 = re.func.getuser(args.join(" "), message)
  if(!user2) return await m.edit(`Unable to find that user`)
  
  m.edit(`${user2}, ${message.author} has challenged you to a battle! Do you accept?`)
};

module.exports.help = {
  name: "battle",
  description: "Battle another user",
  syntax: re.config.prefix + "hp",
  alias: ["health"],
  module: "war",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
