const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let s = args.join(" ")
  let schan = re.dbs.settings.get(message.guild.id+".channels.suggestions")
  if(!schan) return await message.channel.send("There is no suggestion channel setup in this server!")
    re.dbs.suggestions.push("all", {"author": message.author.id, "suggestion": s, "guild": message.guild.id})
    let c = client.channels.cache.get(re.dbs.settings.get(message.guild.id+".channels.suggestions"))
    let ah = await c.fetchWebhooks()
    let h = ah.find(item => item)
    if(!h) h = await c.createWebhook("Galaxy Suggestions")
    await h.edit({
      name: message.author.username,
      avatar: message.author.avatarURL()
    }, "New Suggestion");
    let m = await h.send(new re.Discord.MessageEmbed().setTitle("New Suggestion").setDescription(s).setAuthor(message.author.tag, message.author.avatarURL()).setFooter("Suggested at").setTimestamp())
    await m.react("678023486618468363")
    await m.react("684155550728192019")
    message.delete()
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Suggest something for your server",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["suggestion"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}