const re = require("../resources.js").data

re.client.on("ready", () => {
  console.log(`Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.client.emit("botlog", `Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.func.stats()
  re.client.user.setActivity(re.client.users.cache.size + ' members in ' + re.client.guilds.cache.size + ' servers use %help.', { type: 'WATCHING' })
  setInterval(re.func.stats, 300000)
  let rebootchan = re.dbs.temp.get("rebootchan")
  if(rebootchan){
    re.client.channels.cache.get(rebootchan).send("Bot has successfully been rebooted!")
    re.dbs.temp.delete("rebootchan")
  }
});