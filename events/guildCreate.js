const re = require(`../resources.js`).data
re.client.on("guildCreate", async guild => {
  console.log(`New Guild: ${guild.name} (${guild.id})\n - Member Count: ${guild.memberCount}`)
  re.client.emit(`New Guild: ${guild.name} (${guild.id})\n - Member Count: ${guild.memberCount}`)
});