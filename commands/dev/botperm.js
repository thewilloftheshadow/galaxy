const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getuser(args.join(" "), message)
  if (!user) return message.react("🤷")
  let bp = re.func.botperms(user.id, message)
  // message.channel.send(JSON.stringify(re.func.botperms(user.id, message), null, 4), {"code": "fix"})
  message.channel.send(
    new re.Discord.MessageEmbed()
      .setTitle(user.user.tag + "'s bot permissions")
      .addField("Permission Level", `${bp.level} - ${re.vars.botperms[bp.level]}`)
      .addField("Module Permissions", bp.modules.length > 0 ? `\`${bp.modules.join("`, `")}\`` : "None")
      .addField("Eval", bp.eval)
  )
}

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Check botperms`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {staff: false, mod: false, ecomanage: false, dev: true, owner: false}
}