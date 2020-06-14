const re = require(`../../resources.js`).data
const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  let allset = re.dbs.settings.all()
  let channels = []
  allset.forEach(x => {
    if(re.dbs.settings.get(x.ID+".channels.announcements")) channels.push(re.dbs.settings.get(x.ID+".channels.announcements"))
  })
  let m = await message.channel.send(`Sending message to ${channels.length} servers... <a:GS_Loading:719993838269104199>`)
  let embed = new re.Discord.MessageEmbed().setTitle("Galaxy Announcement").setColor(re.config.color).setAuthor(message.author.tag, message.author.avatarURL()).setDescription(args.join(" ")).setFooter("Sent at").setTimestamp()
  channels.forEach(x => {
    re.client.channels.cache.get(x).send(embed)
  })
  m.edit(`Success! Your message was sent to ${channels.length} servers!`)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Reboot the bot`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["globalannounce", "massannouncement"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4, mm: null}
}