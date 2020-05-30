const re = require(`../resources.js`).data;
re.client.on("guildMemberAdd", async member => {
  if(member.bot) return
  if(!member.guild.id === "641036901511594003") return;
  let chan = re.client.channels.cache.get("642214583721000972")
  let m2 = await chan.send("New user has joined, generating welcome message... <a:TCKC_RainbowLoad:688544088072650821>")
  let welcome = re.client.guilds.cache.get(re.config.server).roles.cache.get("667442500029644810")
  while(!welcome.mentionable){
  await welcome.setMentionable(true, "Welcoming " + member.user.tag)
  await re.func.sleep(10000)
  }
  chan.send(`Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`)
  await m2.delete()
  await re.func.sleep(5000)  
  await welcome.setMentionable(false)
})