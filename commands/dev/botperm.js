const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getuser(args.join(" "), message)
  if(!user) return "🤷"
  message.channel.send(JSON.stringify(message.member.botperms, null, 4), {"code": "fix"})
};

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Check botperms`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:[],
    module:`${__dirname.split(`/`).pop()}`,
    access: {staff: false, mod: false, ecomanage: false, dev: true, owner: false}
}