const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let sniped = re.dbs.snipe.get(message.channel.id)
  let sendsnipe = {"content": "There is nothing to snipe!", "author": re.client.user.tag}
  if(sniped) {
    sendsnipe.content = sniped.content
    sendsnipe.author = sniped.author.tag
  }
  let embed = new re.Discord.MessageEmbed()
  .setDescription(`Here is the last deleted message in this channel:\n\`\`\`fix\n` + sendsnipe.content + `\n\`\`\``)
  .setTitle("Delete bad, snipe good")
  .setAuthor(sendsnipe.author)
  message.channel.send(embed)
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Snipe the last deleted message in the channel",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}