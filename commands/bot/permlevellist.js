const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let embed = new re.Discord.MessageEmbed()
  .setTitle("List of all permission levels:")
  .addField("Level 0", "Basic user, no perms")
  .addField("Level 1", "Server Staff Member")
  .addField("Level 2", "Server Moderator")
  .addField("Level 3", "Server Administrator")
  .addField("Level 4", "Bot Administrator")
  .addField("Level 5", "Developer")
  .addField("Level 6", "Bot Owner")
};

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`List the perm levels`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias:["pll"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
}

