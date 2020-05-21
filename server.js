const http = require('http');
const express = require('express');
const app = express();
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.listen(process.env.PORT);


const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const ms = require("ms")
const unbapi = require('unb-api');
const unb = new unbapi.Client(process.env.unb_token);
const Minesweeper = require('discord.js-minesweeper');
const cmd = require("node-cmd")

const db = require("quick.db");
const modmail = new db.table("modmail");
const cd = new db.table("cd");
const suggestions = new db.table("suggestions")

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  client.user.setActivity('with the minds of ' + client.users.cache.filter(p => !p.bot).size + ' members', { type: 'PLAYING' })
});

client.on("message", async message => {
  let guild = client.guilds.cache.get(config.server);
  let everyone = guild.roles.cache.find(role => role.id === config.server);
  if(message.author.bot) return;
  
  if(!message.guild) return
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  //if(!docmd) return
  if(config.blacklist.includes(message.author.id)) return await message.react("🙉") //blacklist
  
  
  if(command === "ping") {
    message.delete().catch(O_o=>{});
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
  
  if(command === "minesweeper"){
    const minesweeper = new Minesweeper();
    message.channel.send(new Discord.MessageEmbed().setDescription(minesweeper.start()))
  }
  
  if(command === "revive") {
    unb.editUserBalance(message.guild.id, message.author.id, { cash: -1000000000}, "Revive command")

    let lastping = cd.get("revive")
    if((lastping + 7200000) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + ms((lastping + 3600000) - Date.now()))
    let dc = message.guild.roles.cache.get("667442636252250112")
    if(!dc) return message.channel.send("Error: no role found")
    await dc.setMentionable(true)
    await message.react("688544088072650821")
    await sleep(5000)
    await message.channel.send("Ping pong <@&" + dc.id + ">!")
    await dc.setMentionable(false)
    cd.set("revive", Date.now())
  }
  
  if(command === "emergency") {
    let lastping = cd.get("emergency")
    if((/* lastping + 900000 */ 0) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + ms((lastping + 900000) - Date.now()))
    let msr = message.guild.roles.cache.get("694962620914204672")
    if(!msr) return message.channel.send("Error: no role found")
    await msr.setMentionable(true)
    await message.react("688544088072650821")
    await message.channel.setRateLimitPerUser(21600)
    await message.channel.updateOverwrite(message.guild.roles.cache.get("642219487197659139"), {
      SEND_MESSAGES: false
    }, 'Emergency trigger by ' + message.author.tag);
    await sleep(5000)
    await message.channel.send(`<a:TCKC_DETECTED:685262432758792234> **EMERGENCY ALERT** <a:TCKC_DETECTED:685262432758792234>\n**------------------------**\n${msr} Please hurry as there is a emergency that was reported by ${message.author}.\n**------------------------**\n**Note:**\n*If this command was used for no reason, you will be warned*\n*Please do not test the command, as it pings all staff, and locks chat*\n\nStaff: use the command \`%endemergency\` to end the lockdown.`)
    await msr.setMentionable(false)
    cd.set("emergency", Date.now())
  }
  
  if(command === "endemergency") {
    if(!message.member.roles.cache.get("694962620914204672")) return
    await message.react("688544088072650821")
    await message.channel.setRateLimitPerUser(0)
    await message.channel.updateOverwrite(message.guild.roles.cache.get("642219487197659139"), {
      SEND_MESSAGES: true
    }, 'Emergency ended by ' + message.author.tag);
    await sleep(5000)
    await message.channel.send(`The emergency lockdown has been ended by ${message.author} <a:TCKC_wumpus_thumbs_up:684410830800158746>`)
    cd.set("emergency", Date.now())
  }
  
  if(command === "help") {
    const embed = new Discord.MessageEmbed()
    .setTitle("My Commands")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Here is the list of my commands!")
    .setColor(0x00AE86)
    .addField(config.prefix + "ping", "See the bot's latency", true)
    .addField(config.prefix + "revive", "Ping <@&667442636252250112> and revive everything", true)
    .addField(config.prefix + "emergency", "Ping <@&694962620914204672> and lock down everything", true)
    .addField(config.prefix + "minesweeper", "Play Minesweeper on Discord!", true)
    .addField(config.prefix + "suggest", "Make a new suggestion", true)
    // .addField("Modmail", "You can DM me to start a modmail thread with the staff members of the server if you need assistance!")
    message.channel.send({embed});
  }
  
  if(command === "say") {
    message.delete().catch(O_o=>{}); 
    if(message.author.id != config.ownerID) return;
    message.channel.startTyping();
    message.channel.send(args.join(" "));
    message.channel.stopTyping();
  }
  
  if(command === "qotd") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    let chan = client.channels.cache.get("674976320018448435")
    let q = `<a:TCKC_Question:684604290484273156> **Question Of The Day**\n━━━━━━━━━━━━━━━━\n${args.join(" ")}\n━━━━━━━━━━━━━━━━\n<a:RIGHT:582138212395384860> Answer in <#674976444618768394>\n<a:TCKC_PandaHammerPing:678028391869317120> <@&667442362313605131>\n\`\`\` \`\`\``
    let m2 = await chan.send("Generating QOTD... <a:TCKC_RainbowLoad:688544088072650821>")
    let qotd = client.guilds.cache.get(config.server).roles.cache.get("667442362313605131")
    while(!qotd.mentionable){
      await qotd.setMentionable(true, "Posting QOTD")
      await sleep(10000)
    }
    chan.send(q)
    await m2.delete()
    await sleep(5000)  
    await qotd.setMentionable(false)
  }

  if(command === "suggest"){
    let s = args.join(" ")
    suggestions.push("all", {"author": message.author.id, "suggestion": s})
    let c = client.channels.cache.get("709519760940859483")
    let ah = await c.fetchWebhooks()
    let h = ah.find(item => item)
    await h.edit({
      name: message.author.username,
      avatar: message.author.avatarURL()
    }, "New Suggestion");
    let m = await h.send(new Discord.MessageEmbed().setTitle("New Suggestion").setDescription(s).setAuthor(message.author.tag, message.author.avatarURL()).setFooter("Suggested at").setTimestamp())
    await m.react("678023486618468363")
    await m.react("684155550728192019")
    message.delete()
  }
  
  if(command === "members"){
    let m = await message.channel.send("<a:TCKC_ThonkTriangle:678050031017918475>")
    let role = message.guild.roles.cache.find(r => r.name === args.join(" "))
    if(!role) role = message.mentions.roles.first()
    if(!role) role = message.guild.roles.cache.get(args[0])
    let members = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === role.name))
    m.edit(members.map(m => m.user), new Discord.MessageEmbed().setDescription("Found a total of " + members.size + " members with the " + role.name + " role"))
  }
  
  if(command === "whotorob"){
    let lb = await unb.getGuildLeaderboard(message.guild.id, { sort: 'cash' })
    let m = await message.channel.send("Let's see who has the fattest wallet... <a:TCKC_ThonkTriangle:678050031017918475>")
    await sleep(5000)
    let user = lb[Object.keys(lb)[0]]
    m.edit(new Discord.MessageEmbed().setDescription(`I suggest you rob <@${user.user_id}>. They have <a:TCKC_MoneyBag:710609208286117898> ${user.cash} cash.`))
  }
  
  if(command === "richest"){
    let lb = await unb.getGuildLeaderboard(message.guild.id, { sort: 'cash' })
    let m = await message.channel.send("Mirror mirror on the wall, who's the richest of them all? <a:TCKC_ThonkTriangle:678050031017918475>")
    await sleep(5000)
    let user = lb[Object.keys(lb)[0]]
    m.edit(new Discord.MessageEmbed().setDescription(`<@${user.user_id}> is the richest user in the server. They have <a:TCKC_MoneyBag:710609208286117898> ${user.total} value.`))
  }
  
  if (command === "eval") {
    if(message.author.id === "631648955104624652") message.channel.send("Stop trying to use the fricking eval Milky <a:TCKC_ToadTriggered:712383876433182790>")
    if(message.author.id !== config.ownerID) 
      return message.reply(":warning: You don't have permission to use that command! :warning:")
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  
  // if (command === "gitupdate") {
  //   if(message.author.id !== config.ownerID) 
  //     return message.reply(":warning: You don't have permission to use that command! :warning:")
  //   cmd.run("git fetch origin master")
  //   cmd.run("git reset --hard origin/master")
  //   cmd.run("git pull origin master --force")
  // }

});

//Welcome new users
client.on("guildMemberAdd", async member => {
  if(member.bot) return
  let chan = client.channels.cache.get("642214583721000972")
  let m2 = await chan.send("New user has joined, generating welcome message... <a:TCKC_RainbowLoad:688544088072650821>")
  let welcome = client.guilds.cache.get(config.server).roles.cache.get("667442500029644810")
  while(!welcome.mentionable){
  await welcome.setMentionable(true, "Welcoming " + member.user.tag)
  await sleep(10000)
  }
  chan.send(`Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`)
  await m2.delete()
  await sleep(5000)  
  await welcome.setMentionable(false)
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

function sleep(ms)  {
  return new Promise(resolve => setTimeout(resolve, ms))
}


//client.login(process.env.TOKEN);
