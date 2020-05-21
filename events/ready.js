const re = require("../resources.js").data

re.client.on("ready", () => {
  console.log(`Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.client.user.setActivity('with the minds of ' + re.client.users.cache.filter(p => !p.bot).size + ' members', { type: 'PLAYING' })
});