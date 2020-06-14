const re = require(`../../resources.js`).data
const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  let allset = re.dbs.settings.all()
  let channels = []
  let dms = []
  allset.forEach(x => {
    if(re.dbs.settings.get(x.ID+".channels.announcements")){
      channels.push(re.dbs.settings.get(x.ID+".channels.announcements"))
    } else {
      let guild = re.client.guilds.cache.get(x.ID)
      if(guild) dms.push(guild.ownerID)
    }
  })
  let m = await message.channel.send(`Sending message to ${re.client.guilds.cache.size} servers... <a:GS_Loading:719993838269104199>`)
  let embed = new re.Discord.MessageEmbed().setTitle("Galaxy Announcement").setColor(re.config.color).setAuthor(message.author.tag, message.author.avatarURL()).setDescription(args.join(" ")).setFooter("Sent at").setTimestamp()
  channels.forEach(async x => {
    re.client.channels.cache.get(x).send(embed)
    await re.func.sleep(1000)
  })
  embed.addField("Don't want these DMs?", `If you don't want to get announcements in your DMs, you can use the command \`%setup channel announcements\` **in your server** to set a channel for this command to be used in.`)
  dms.forEach(async x => {
    re.client.users.cache.get(x).send(embed).catch(()=>{})
    await re.func.sleep(1000)
  })
  m.edit(`Success! Your message was sent to ${channels.length} servers! ${dms.length} servers didn't have channels setup, so the server owner was DMed instead.`)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Reboot the bot`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["globalannounce", "massannouncement"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4, mm: null}
}