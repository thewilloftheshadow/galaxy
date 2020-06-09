const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getuser(args.join(" "), message)
  if (!user) return message.react("🤷")
  let bp = re.func.botperms(user.id, message)
  // message.channel.send(JSON.stringify(re.func.botperms(user.id, message), null, 4), {"code": "fix"})
  let embed = new re.Discord.MessageEmbed()
      .setTitle(user.user.tag + "'s bot permissions")
      .setDescription(`Permission Level: ${bp.level} - ${user.user.bot ? "Bot" : re.vars.botperms[bp.level]}`)
  if(bp.mm && bp.mm.length > 0) embed.description += "\nModule Permissions: " + bp.mm.length > 0 ? `\`${bp.mm.join("`, `")}\`` : "None"
  if(bp.eval) embed.description += "\nEval: " +  bp.eval
  message.channel.send(embed)
}

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Check botperms`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user>`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
}