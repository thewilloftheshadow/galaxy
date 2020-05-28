const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  message.channel.send("bruh")
  await re.func.sleep(re.func.getRandom(15000, 30000))
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%bruh\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
};

module.exports.help = {
  name: "bruh",
  description: "Bruh...",
  syntax: re.config.prefix + "bruh",
  alias: ["custom-695651396573200394"],
  module: "custom",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
