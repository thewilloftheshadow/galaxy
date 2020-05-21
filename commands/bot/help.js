const re = require(`../../resources.js`).data

module.exports.run = async (client, message, args) => {
  let command = args[0];
  let commands = [];
  if (!command){
    let embed = new re.Discord.MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor(re.config.color)
    let modulecommands = []
    // client.commands.forEach(command => {
    //   if(command.help.module === "bot"){
    //     if(!modulecommands.find(c => c == command.help.name)){
    //       modulecommands.push(command.help.name)
    //     }
    //   }
    // })
    // let serverprefix = re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix
    // embed.addField(`**Bot:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
    await re.config.modules.forEach(async module => {
      let modulecommandarray = []
      let modulecommands = ""
      client.commands.forEach(command => {
        if(command.help.module === module && !command.help.nohelp){
          if(!modulecommandarray.find(c => c == command.help.name)){
            modulecommandarray.push(command.help.name)
            modulecommands += `**${re.config.prefix}${command.help.name}**\n - ${command.help.description}\n`
          }
        }
      })
      let serverprefix = re.config.prefix
      if(module == "bot") await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "player" && message.member.roles.cache.find(r => r.name === "Player")) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "gm" && message.member.roles.cache.find(r => r.name === "GM" || r.name === "Co-GM")) await embed.addField(`**${module.toUpperCase()}:**`, modulecommands)
      if(module == "dev" && message.author.id === re.config.ownerID) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
    })
    message.channel.send(embed)
  }
  else{
    let props = client.commands.get(command);
    if (!props || props.help.name == "secretphrasetousefordmmessages")
      return message.channel.send("Sorry, I couldn't find that command");
    let embed = new re.Discord.MessageEmbed()
      embed.setTitle(`Command info for ${command}`)
      embed.setAuthor(message.author.tag, message.author.avatarURL())
      embed.setColor(re.config.color)
      embed.fields = [
        {
          name:`Description:`, 
          value:`${props.help.description}`
        },
        {
          name:`Syntax:`, 
          value:`\`${props.help.syntax}\``
        },
        {
          name:`Module:`, 
          value:`${props.help.module}`
        }
      ]
    if (props.help.access.dev) embed.setDescription("This is a dev command!");
    if (props.help.access.gm) embed.setDescription("This is a GM command!");
    if (props.help.access.player) embed.setDescription("This is a player-only command!");
    if (props.help.alias && props.help.alias.length > 0)
      embed.fields.push({
        name: `Aliases:`,
        value: `\`${re.prefix}${props.help.alias.join("`, `" + re.prefix)}\``
});
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  description: "Get help for any command, or list all commands",
  syntax: re.prefix + "help <command>",
  alias: ["command"],
  module: "bot",
  access: {player: false, gm: false, dev: false}
};
