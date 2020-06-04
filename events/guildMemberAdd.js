const re = require(`../resources.js`).data
re.client.on("guildMemberAdd", async member => {
  re.client.user.setActivity(re.client.users.cache.size + ' members in ' + re.client.guilds.cache.size + ' servers use %help.', { type: 'WATCHING' })
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
      await re.func.sleep(10000)
    }
    // chan.send(
    //   `Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`
    // )
    chan.send(
      `>>> Hey ${member}, welcome to The Cool Kids Club! <a:TCKC_Confetti:683860124888072252>\n◇────◇─────◇──◇\n${welcome}, please welcome them! <a:TCKC_BlobEnter:684607464225767424>\n◇────◇─────◇──◇\nFeel free to visit the following channels! <a:GS_Verified:718213298063015937>\n◇────◇─────◇──◇\n○ <#642943363301244961>\n○ <#675155024908779550>\n○ <#684203794745393199>\n○ <#718212052224835715>\n◇────◇─────◇──◇\nMake sure to boost us aswell! <a:TCKC_Nitro:683895356018130952>\n◇────◇─────◇──◇`
    )
    await m2.delete()
    await re.func.sleep(5000)
    await welcome.setMentionable(false)
  }
})
