const re = require("../resources.js").data

re.client.on("ready", () => {
  console.log(`Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.client.emit("botlog", `Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.func.stats()
  re.client.user.setActivity('with the minds of ' + re.client.users.cache.size + ' members in ' + re.client.guilds.cache.size + ' servers.', { type: 'PLAYING' })
  setInterval(re.func.stats, 300000)
});