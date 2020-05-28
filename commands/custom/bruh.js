const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  let lastping = re.dbs.cd.get("bruh")
  if((lastping + 900000) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + require("ms")((lastping + 900000) - Date.now()))
  re.dbs.cd.set("bruh", Date.now())
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Custom command \`%bruh\`used by ${message.author.tag}`).setDescription(`Command used by <@${message.author.id}> in ${message.channel}`))
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
  message.channel.send("bruh")
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`The bruh has ended`))
};

module.exports.help = {
  name: "bruh",
  description: "Bruh...",
  syntax: re.config.prefix + "bruh",
  alias: ["custom-695651396573200394"],
  module: "custom",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
