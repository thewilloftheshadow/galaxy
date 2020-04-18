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

const db = require("quick.db");
const modmail = new db.table("modmail");
const cd = new db.table("cd");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  client.user.setActivity('my DMS', { type: 'WATCHING' })
});




client.on("message", async message => {
  let guild = client.guilds.cache.get(config.server);
  let everyone = guild.roles.cache.find(role => role.id === config.server);
  if(message.author.bot) return;
  
  //Begin Modmail Module
  if (message.guild === null) {
    let channel = modmail.get(message.author.id + ".channel");
    if (!channel) {
      channel = await guild.channels.create(
        `${message.author.username}-${message.author.discriminator}`,
        { type: "text" }
      );
      channel.overwritePermissions("439223656200273932", {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        MANAGE_MESSAGES: true
      });
      channel.overwritePermissions(everyone, {
        VIEW_CHANNEL: false
      });
      client.channels.cache
        .get(channel.id)
        .setTopic(
          `${config.prefix}close to close the Ticket | ModMail for ${message.author.tag} - ID: ${message.author.id}`
        );
      modmail.set(message.author.id + ".channel", channel.id);
      modmail.set(channel.id + ".author", message.author.id);
      await channel.setParent(config.modmailcat);
      channel.send(`New ModMail thread from ${message.author}`);
      channel.send(message.content);
      message.author.send("New modmail thread opened successfully!");
    } else {
      client.channels.cache
        .get(channel)
        .send(`From ${message.author}\n\`\`\`fix\n${message.content}\n\`\`\``);
    }
    message.react("✅");
  }
  if(!message.guild) return
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  let modmailauthor = modmail.get(message.channel.id + ".author");
  let docmd = true
  if (modmailauthor && message.content.indexOf(config.prefix) !== 0) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`New ModMail Message!`)
    .setColor("#D96928")
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.avatarURL)
    .addField("From:", message.author)
    .addField("Discord ID:", message.author.id)
    .addField("Message", message.content)
    .setFooter("Galaxy")
    .setTimestamp();
    client.users.get(modmailauthor).send(embed);
    message.react("✅");
    docmd = false
  }
  
  if (command === "close" && modmailauthor) {
    message.channel.delete();
    let embed = new Discord.MessageEmbed()
    .setTitle(`ModMail Thread Closed`)
    .setColor("#D96928")
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.avatarURL)
    .addField("From:", message.author)
    .addField("Discord ID:", message.author.id)
    .setFooter("Galaxy")
    .setTimestamp();
    client.users.get(modmailauthor).send(embed);
    modmail.delete(modmailauthor.id);
    modmail.delete(message.channel.id);
    docmd = false
  }
  
  //End Modmail Module
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(!docmd) return
  if([].includes(message.author.id)) return await message.react("🙉") //blacklist
  
  
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
    let lastping = cd.get("revive")
    if((lastping + 3600000) > Date.now()) return message.channel.send("⏲ This command is on cooldown for another " + ms((lastping + 3600000) - Date.now()))
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
    await message.channel.send(`<a:TCKC_DETECTED:685262432758792234> **EMERGENCY ALERT** <a:TCKC_DETECTED:685262432758792234>\n**------------------------**\n${msr} Please hurry as there is a emergency that was reported by ${message.author}.\n**------------------------**\n**Note:**\n*If this command was used for no reason, you will be warned*\n*Please do not test the command, as it pings all staff, and locks chat*`)
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
    //.addField("Modmail", "You can DM me to start a modmail thread with the staff members of the server if you need assistance!")
    message.channel.send({embed});
  }
  
  if(command === "say") {
    message.delete().catch(O_o=>{}); 
    if(!message.author.id === config.ownerID) return
    message.channel.startTyping();
    message.channel.send(args.join(" "));
    message.channel.stopTyping();
  }
  
  if (command === "eval") {
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

});

//Welcome new users
client.on("guildMemberAdd", async member => {
  if(member.bot) return
  let chan = client.channels.cache.get("642214583721000972")
  let welcome = client.guilds.cache.get(config.server).roles.get("667442500029644810")
  await welcome.setMentionable(true, "Welcoming " + member.user.tag)
  sleep(5000)
  chan.send(`Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`)
  sleep(5000)  
  await welcome.setMentionable(false)
  console.log("done")
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


client.login(process.env.TOKEN);
