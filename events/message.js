const re = require(`../resources.js`).data;
re.client.on("message", async message => {
  if(re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  let prefix = re.config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return;
  console.log(`${re.moment().format('MMMM Do YYYY, h:mm:ss a')} | ${message.author.tag} - ${message.content}`)
  let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ /g);
  let command = args.shift().toLowerCase();
    if(command == "secretphrasetousefordmmessages" && message.guild) command = "WOOOOOOOT"
    if(command === "args"){
      return message.channel.send(`["${args.join(`", "`)}"]`, {code:"xl"})
    }
    let commandfile = re.client.commands.get(command);
    if (!commandfile) return message.react("684556205582057518")
    if (message.author.bot && !commandfile.help.botcmd) return;
    if (message.author.id === re.config.ownerID || re.config.developers.includes(message.author.id)){
      message.author.isDev = true;
    }
    let tckc = re.client.guilds.cache.find(guild => guild.id === re.config.server)
    if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("694962620914204672"))){
      message.author.isMod = true;
    }
    if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("712070389815312385"))){
      message.author.isStaff = true;
    }
    if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("710614561668989018"))){
      message.author.isEcoManage = true;
    }
  
    if(!re.allunb[message.guild.id] && ["economy", "economymanage"].includes(commandfile.help.module)) return message.channel.send("Sorry! This server isn't setup for economy commands yet. Open a ticket in the Galaxy server (%support) to get started!")
    
    let cmdaccess = commandfile.help.access
    if(cmdaccess.staff && !message.author.isStaff){
      message.delete()
      return message.author.send(
        "Sorry! This command is for staff only."
      );
    }
    if(cmdaccess.ecomanage && !message.author.isEcoManage){
      message.delete()
      return message.author.send(
        "Sorry! This command is for Economy Managers only."
      );
    }
    if(cmdaccess.mod && !message.author.isMod){
      message.delete()
      return message.author.send(
        "Sorry! This command is for mods only."
      );
    }
    if (cmdaccess.dev && !message.author.isDev){
      message.delete()
      if(message.author.id === "631648955104624652") return message.channel.send("Bruh you're freaking banned from using eval cause you nuked a whole freaking server idiot")
      return message.channel.send(
        "Sorry! This command is for developers only."
      );
    }
    if (cmdaccess.owner && !message.author.id === re.config.ownerID){
      message.delete()
      return message.author.send(
        "Sorry! This command is for the owner only."
      );
    }      
    
  try {
    await commandfile.run(re.client, message, args)
  } catch (err) {
    let embed = new re.Discord.MessageEmbed()
      .setDescription(
        `An error occured when ${
          message.author
        } (${message.author.id}) attempted the following command: \`${message.content.replace(
          /(`)/g,
          "$1"
        )}\``
      )
      .addField(
        "Error Description",
        `\`\`\`${err.stack.replace(
          /(?:(?!\n.*?\(\/app.*?)\n.*?\(\/.*?\))+/g,
          "\n\t..."
        )}\`\`\``
      ).setColor("RED")
    await message.channel.send(
      `An error occurred when trying to execute this command. The developers have been notified.`
    )
    re.client.channels.cache.get(re.config.errors).send("<@439223656200273932>", embed)
    console.error(err)
  }
  
});