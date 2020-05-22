const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let s = args.join(" ")
    re.dbs.suggestions.push("all", {"author": message.author.id, "suggestion": s})
    let c = client.channels.cache.get("709519760940859483")
    let ah = await c.fetchWebhooks()
    let h = ah.find(item => item)
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
  name: "suggest",
  description: "Suggest something for our server",
  syntax: re.config.prefix + "suggest <suggestion>",
  alias: ["suggestion"],
  module: "utility",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};
