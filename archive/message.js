const re = require(`../resources.js`).data;
re.client.on("message", async message => {
  if(re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  if(!message.guild) return
  let prefix = re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix
  message.prefix = prefix
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return;
  console.log(`${re.moment().format('MMMM Do YYYY, h:mm:ss a')} | ${message.author.tag} - ${message.content}`)
  message.author.botperms = re.func.botperms(message.author.id, message)
  message.member.botperms = message.author.botperms
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
    // if (message.author.id === re.config.ownerID || re.config.developers.includes(message.author.id)){
    //   message.author.isDev = true;
    // }
    // let tckc = re.client.guilds.cache.find(guild => guild.id === re.config.server)
    // if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && (tckc.members.cache.get(message.author.id).roles.cache.get("710567729245192233") || tckc.members.cache.get(message.author.id).roles.cache.get("716434323057672223")))){
    //   message.author.isMod = true;
    // }
    // if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("712070389815312385"))){
    //   message.author.isStaff = true;
    // }
    // if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("710614561668989018"))){
    //   message.author.isEcoManage = true;
    // }
  if(["economy", "economymanage", "war", "factions"].includes(commandfile.help.module) && !message.guild.members.cache.get("292953664492929025")) return message.channel.send("Sorry! This server isn't setup for economy commands yet. Open a ticket in the Galaxy server (%support) to get started!")
    // if(!re.allunb[message.guild.id] && ["economy", "economymanage"].includes(commandfile.help.module)) return message.channel.send("Sorry! This server isn't setup for economy commands yet. Open a ticket in the Galaxy server (%support) to get started!")
    
  if((message.guild.id != re.config.server) && re.config.tckcmodules.includes(commandfile.help.module) && message.author.id != re.config.ownerID) return message.channel.send("Sorry! This command is only for the TCKC server!\nhttps://discord.gg/Upkp7FZ")
    
    let cmdaccess = commandfile.help.access
    if(cmdaccess.level < message.member.botperms.level){
      return message.author.send(
        `Sorry! This command requires Level ${cmdaccess.level} permissions, but you only have Level ${message.member.botperms.level} permissions.`
      );
    }
    if(cmdaccess.mm != "" && !message.member.botperms.mm.includes(cmdaccess.mm)){
      return message.author.send(
        `Sorry! This command requires MM ${cmdaccess.mm} permissions, but you don't have that MM permission.`
      );
    }
    if(commandfile.help.name === "eval" && !message.member.botperms.eval)
      return message.author.send(
        `Sorry! This command requires eval permissions, but you don't have eval permissions.`
      );
    
    // if(cmdaccess.staff && !message.author.isStaff){
    //   message.delete()
    //   return message.author.send(
    //     "Sorry! This command is for staff only."
    //   );
    // }
    // if(cmdaccess.ecomanage && !message.author.isEcoManage){
    //   message.delete()
    //   return message.author.send(
    //     "Sorry! This command is for Economy Managers only."
    //   );
    // }
    // if(cmdaccess.mod && !message.author.isMod){
    //   message.delete()
    //   return message.author.send(
    //     "Sorry! This command is for mods only."
    //   );
    // }
    // if (cmdaccess.dev && !message.author.isDev){
    //   message.delete()
    //   if(message.author.id === "631648955104624652") return message.channel.send("Bruh you're freaking banned from using eval cause you nuked a whole freaking server idiot")
    //   return message.channel.send(
    //     "Sorry! This command is for developers only."
    //   );
    // }
    // if (cmdaccess.owner && !message.author.id === re.config.ownerID){
    //   message.delete()
    //   return message.author.send(
    //     "Sorry! This command is for the owner only."
    //   );
    // }      
    
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
    re.client.channels.cache.get(re.config.errors).send("<@&717426148698620022>", embed)
    console.error(err)
  }
  
});