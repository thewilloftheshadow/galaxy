const re = require(`../resources.js`).data;
re.client.on("message", async message => {
  console.log(`${re.moment().format('MMMM Do YYYY, h:mm:ss a')} | ${message.author.tag} - ${message.content}`)
  if(re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  let prefix = re.config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return;
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
    if (message.author.id === re.config.ownerID){
      message.author.isDev = true;
    }
    let tckc = re.client.guilds.cache.find(guild => guild.id === re.config.server)
    if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("694962620914204672"))){
      message.author.isMod = true;
    }
    if (message.author.id === re.config.ownerID || (tckc.members.cache.get(message.author.id) && tckc.members.cache.get(message.author.id).roles.cache.get("712070389815312385"))){
      message.author.isStaff = true;
    }
    
    let cmdaccess = commandfile.help.access
    if(cmdaccess.player && !message.author.isStaff){
      message.delete()
      return message.author.send(
        "Sorry! This command is for staff only."
      );
    }
    if(cmdaccess.player && !message.author.isMod){
      message.delete()
      return message.author.send(
        "Sorry! This command is for mods only."
      );
    }
    if (cmdaccess.dev && !message.author.isDev){
      message.delete()
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
    
  commandfile.run(re.client, message, args) 
  
});