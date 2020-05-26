const re = require(`../../resources.js`).data
const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  re.dbs.temp.set("rebootchan", message.channel.id)
  message.react("✅")
  client.user.setStatus('offline')
  cmd.run("refresh")
};

module.exports.help = {
  name: "restart",
  description: "Restart the entire server",
  syntax: re.prefix + "reload <command>",
  alias: ["reboot"],
  module: "dev",
  access: {staff: false, mod: false, ecomanage: false, dev: true, owner: false}
};
