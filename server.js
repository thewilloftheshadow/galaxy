// 24/7 hour script
const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200); // Sends the 200 status (OK, no problem with the vps server)
});
app.listen(process.env.PORT);

// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
const ms = require("ms")

const db = require("quick.db");
const modmail = new db.table("modmail");
const cd = new db.table("cd");


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
client.user.setActivity('my DMS', { type: 'WATCHING' }  )


});




client.on("message", async message => {
  let guild = client.guilds.cache.get(config.server);
  let everyone = guild.roles.cache.find(role => role.id === config.server);
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
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
  
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message ",say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
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
  
  
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(!docmd) return
  if([].includes(message.author.id)) return await message.react("🙉")
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    message.delete().catch(O_o=>{});
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
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
    .addField(config.prefix + "restart", "Restart the bot");
    message.channel.send({embed});
  }
  
  
  if(command === "say") {
    message.delete().catch(O_o=>{}); 
    if(!message.author.id === config.ownerID) return
    message.channel.startTyping();
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
    message.channel.stopTyping();
  }
  
  
  
  if(command === "inrole") {
    let roleName = message.content.split(" ").slice(1).join(" ");
    let membersWithRole = message.guild.members.cache.filter(member => { 
        return member.roles.cache.find("name", roleName);
    }).map(member => {
        return member.user.username;
    })

    message.channel.send("**Users with the " + roleName + " role:**\n```" + membersWithRole.join("\n") + "```")
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


client.on("guildMemberAdd", async member => {
  console.log(member)
  let chan = client.channels.cache.get("642214583721000972")
  let welcome = client.guilds.cache.get(config.server).roles.get("667442500029644810")
  await welcome.setMentionable(true, "Welcoming " + member.user.tag)
  sleep(5000)
  chan.send(`Hey ${member}, welcome to The Cool Kids Club! 🎉\n◇────◇─────◇──◇\n<@&${welcome.id}>, please welcome them!\n◇────◇─────◇──◇\nDon’t forget to read <#642943363301244961> and <#675155024908779550>!\nAnd check out <#684203794745393199> for some custom roles!\nThen, go to <#696075558358089768> to introduce yourself!`)
  sleep(5000)  
  await welcome.setMentionable(false)
  console.log("done")
})


function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
    channel.send('Bot has been restarted');
}

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