const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {

    let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
    let role = message.guild.roles.cache.find(r => r.name === args.join(" "))
    if(!role) role = message.mentions.roles.first()
    if(!role) role = message.guild.roles.cache.get(args[0])
    if(!role) m.edit("That role doesn't exist idiot")
    let members = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === role.name))
    let memmsg = `${members.map(m => m.user)}`
    if(memmsg.length > 2000) memmsg = "Member list exceeded max message length"
    m.edit(memmsg, new re.Discord.MessageEmbed().setDescription("Found a total of " + members.size + " members with the " + role.name + " role"))
};

module.exports.help = {
  name: "members",
  description: "List members in a role",
  syntax: re.config.prefix + "members <role>",
  alias: ["inrole"],
  module: "staff",
  access: {staff: true, mod: false, ecomanage: false, fleader: false, dev: false, owner: false}
};
