const re = require(`../resources.js`).data
re.client.on("guildMemberAdd", async member => {
  re.client.user.setActivity(re.client.users.cache.size + ' members in ' + re.client.guilds.cache.size + ' servers use %help.', { type: 'WATCHING' })
  if(member.bot || member.user.bot) return
  let wmsg = re.dbs.settings.get(`${member.guild.id}.msg.welcome`)
  let wchan = re.dbs.settings.get(`${member.guild.id}.channels.welcome`)
  let wroles = re.dbs.settings.get(`${member.guild.id}.roles.welcome`)
  if(!wchan || !wmsg) return
  let m2 = await chan.send(
    "New user has joined, generating welcome message..."
  )
  wroles.forEach(async x => {
    let role = member.guild.roles.cache.get(x)
    while (!role.mentionable) {
      await role.setMentionable(true, "Welcoming " + member.user.tag)
      await re.func.sleep(500)
    }
  })
  await re.func.sleep(5000)
  await wchan.send(wmsg)
  await m2.delete()
  wroles.forEach(x => {
    let role = member.guild.roles.cache.get(x)
    while (role.mentionable) {
      role.setMentionable(false)
      re.func.sleep(1000)
    }
  })
  if (!member.bot && member.guild.id === "641036901511594003") {
    let chan = re.client.channels.cache.get("642214583721000972")
    let m2 = await chan.send(
      "New user has joined, generating welcome message... <a:TCKC_RainbowLoad:688544088072650821>"
    )
    let welcome = re.client.guilds.cache
      .get(re.config.server)
      .roles.cache.get("667442500029644810")
    while (!welcome.mentionable) {
      await welcome.setMentionable(true, "Welcoming " + member.user.tag)
      await re.func.sleep(2000)
    }
    // chan.send(
    //   `Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`
    // )
    chan.send(
      `>>> Hey ${member}, welcome to The Cool Kids Club! <a:TCKC_Confetti:683860124888072252>\n◇────◇─────◇──◇\n${welcome}, please welcome them! <a:TCKC_BlobEnter:684607464225767424>\n◇────◇─────◇──◇\nFeel free to visit the following channels! <a:GS_Verified:718213298063015937>\n◇────◇─────◇──◇\n○ <#642943363301244961>\n○ <#675155024908779550>\n○ <#684203794745393199>\n○ <#718212052224835715>\n◇────◇─────◇──◇\nMake sure to boost us aswell! <a:TCKC_Nitro:683895356018130952>\n◇────◇─────◇──◇`
    )
    await m2.delete()
    await re.func.sleep(2000)
    await welcome.setMentionable(false)
  }
  if (!member.bot && member.guild.id === "727636528972693525") {
    let chan = re.client.channels.cache.get("727636529463427084")
    let gname = re.client.guilds.cache.get("727636528972693525").name
    let m2 = await chan.send(
      "New user has joined, generating welcome message... <a:TCKC_RainbowLoad:688544088072650821>"
    )
    chan.send(
      `●○◉◯●○◉◯●○◉◯●○◉◯●○◉○●◯◉○●◯◉○●◯◉○●◯◉\nHello, ${member}! Welcome to ${gname}!\n<@&727636529220026471> be sure to welcome them!\n●○◉◯●○◉◯●○◉◯●○◉◯●○◉○●◯◉○●◯◉○●◯◉○●◯◉\n\n★ Make sure to read the <#727636529329209399> and <#727636529329209400>\n★ Choose some roles in <#728399107282042882> <#728398985768730664> <#728399123421724682>\n\n﹥━━━━━━━━━━━━━━━━━━━━━﹤\n**Thank you for joining and please enjoy your stay!**`
    )
    await m2.delete()
  }
})
