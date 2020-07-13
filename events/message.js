const re = require(`../resources.js`).data;
re.client.on("message", async message => {
  if(!message.guild) return
  if (message.author && message.author.bot && re.config.unbid.includes(message.author.id)) return;

  let counting = re.dbs.settings.get(message.guild.id+".channels.counting")
  if(counting && counting.includes(message.channel.id)){
    let cc = re.dbs.games.get(`${message.guild.id}.counting.${message.channel.id}`)
    if(message.content != cc.nextnum.toString()) return message.delete()
    if(message.author.id === cc.lastid && !message.thisisedit) return message.delete()
    re.dbs.games.set(`${message.guild.id}.counting.${message.channel.id}.lastid`, message.author.id)
    re.dbs.games.set(`${message.guild.id}.counting.${message.channel.id}.nextnum`, parseInt(message.content, 10) + 1)
    re.dbs.games.set(`${message.guild.id}.counting.${message.channel.id}.lastnum`, parseInt(message.content, 10))
    //message.channel.setTopic(`Counting by Galaxy | Next Number: ${parseInt(message.content) + 1}`)
    message.channel.setTopic(`Counting by Galaxy`)
  }

  let onewordstory = re.dbs.settings.get(message.guild.id+".channels.onewordstory")
  if(onewordstory && onewordstory.includes(message.channel.id)){
    let ows = re.dbs.games.get(`${message.guild.id}.onewordstory.${message.channel.id}`)
    if(message.author.id === ows.lastid && !message.thisisedit) return message.delete()
    let story = re.dbs.games.set(`${message.guild.id}.onewordstory.${message.channel.id}.story`) || ""
    re.dbs.games.set(`${message.guild.id}.onewordstory.${message.channel.id}.lastid`, message.author.id)
    re.dbs.games.set(`${message.guild.id}.onewordstory.${message.channel.id}.story`, story + ` ${message.content}`)
    message.channel.setTopic(`One Word Story by Galaxy`)
  }

  let prefix = re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix
  message.prefix = prefix
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return;
  if(re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  let botbancheck = re.dbs.botban.get(message.author.id)
  if(botbancheck && !message.content.startsWith(`${re.config.prefix}eval`)) return message.react("🙉")
  console.log(`${re.moment().format('MMMM Do YYYY, h:mm:ss a')} | ${message.author.tag} - ${message.content}`)
  message.author.botperms = re.func.botperms(message.author.id, message)
  message.member.botperms = message.author.botperms
  let tagarray = message.content.toLowerCase().split("--")
  tagarray.shift()
  tags = {}
  tagarray.forEach(x => {
    ta = x.split(" ")
    if(ta[1] === "true") ta[1] = true
    if(ta[1] === "false") ta[1] = false
    tags[ta[0]] = ta[1]
  })
  // console.log(`                        - ${JSON.stringify(tags, null, 2)}`)
  message.tags = tags
  let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ /);
  let command = args.shift().toLowerCase();
  if(command == "secretphrasetousefordmmessages" && message.guild) command = "WOOOOOOOT"
  if(command === "args"){
    return message.channel.send(`["${args.join(`", "`)}"]`, {code:"xl"})
  }
  if(command === "tags"){
    return message.channel.send(JSON.stringify(tags, null, 2), {code:"xl"})
  }
  let commandfile = re.client.commands.get(command);
  if (!commandfile) return message.react("684556205582057518")
  if(["economy", "economymanage", "war", "factions"].includes(commandfile.help.module) && !message.guild.members.cache.get("292953664492929025")) return message.channel.send("Sorry! This server isn't setup for economy commands yet. Open a ticket in the Galaxy server (`%support`) to get started!")
    
  if((message.guild.id != re.config.server) && re.config.tckcmodules.includes(commandfile.help.module) && message.author.id != re.config.ownerID) return message.channel.send("Sorry! This command is only for the TCKC server!\nhttps://discord.gg/Upkp7FZ")
    
    let cmdaccess = commandfile.help.access
    if(cmdaccess.level > message.member.botperms.level){
      return message.channel.send(
        `Sorry! This command requires Level ${cmdaccess.level} permissions, but you only have Level ${message.member.botperms.level} permissions.`
      );
    }
    if(cmdaccess.mm && !message.member.botperms.mm.includes(cmdaccess.mm)){
      return message.channel.send(
        `Sorry! This command requires MM ${cmdaccess.mm} permissions, but you don't have that MM permission.`
      );
    }
    if(commandfile.help.name === "eval" && !message.member.botperms.eval)
      return message.channel.send(
        `Sorry! This command requires eval permissions, but you don't have eval permissions.`
      );     
    
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
      .setFooter("Server ID: " + message.guild.id)
    await message.channel.send(
      `An error occurred when trying to execute this command. The developers have been notified.`
    )
    re.client.channels.cache.get(re.config.errors).send("<@&717426148698620022>", embed)
    console.error(err)
  }
  
});