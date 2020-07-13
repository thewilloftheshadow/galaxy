const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let curSettings = re.dbs.settings.get(message.guild.id)
  if(!args[0]) return message.channel.send(`\`\`\`js\n${JSON.stringify(curSettings, null, 4)}\`\`\``)
  let setting = args[0]
  let cleanSetting = args[0]
  let valueid = 1
  let push = args[1]
  if(push === "push") valueid = 2
  let value = args.slice(valueid).join(" ")
  if(!value) return message.channel.send(`\`${cleanSetting}\` is currently set to \`${re.dbs.settings.get(message.guild.id+"."+setting)}\``)
  if(value === "true") value = true
  if(value === "false") value = false
  if(value === "--emptystring--") value = ""
  if(push === "push"){
    re.dbs.settings.push(message.guild.id+"."+setting, value)
  } else {
    re.dbs.settings.set(message.guild.id+"."+setting, value)
  }
  message.channel.send(`\`${cleanSetting}\` has been ${push === "push" ? "pushed" : "set"} to \`${re.dbs.settings.get(message.guild.id+"."+setting)}\``)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Change settings for this guild. Use without arguments to see the settings for this guild",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <setting> <value>\n${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <setting> push <value>`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 5, mm: null}
}
