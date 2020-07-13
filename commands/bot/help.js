const re = require(`../../resources.js`).data

module.exports.run = async (client, message, args) => {
  let command = args[0];
  let commands = [];
  if (!command){
    let embed = new re.Discord.MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor(re.config.color)
    .setFooter("Use the command %help <command> to get more info on a specific command!")
    let modulecommands = []
    await re.config.modules.forEach(async module => {
      let modulecommandarray = []
      let modulecommands = ""
      client.commands.forEach(command => {
        if(command.help.module === module && !command.help.nohelp){
          if(!modulecommandarray.find(c => c == command.help.name)){
            modulecommandarray.push(command.help.name)
            cantuse = false
            if(message.author.botperms.level < command.help.access.level) cantuse = true
            if(command.help.access.mm && !message.author.botperms.mm.includes(command.help.access.mm)) cantuse = true
            modulecommands += `${cantuse ? "~~" : ""}${message.prefix}${command.help.name}${cantuse ? "~~" : ""}\n`
          }
        }
      })
      await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands, true)
    })
    embed.addField("Note:", "If a command is crossed out, you do not have access to use it\nUse the command %help <command> to get more info on a specific command!\nAn update to this will be coming soon, fixing some issues with the formatting and generation.")
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
          value:`\`${props.help.syntax.replace(/jejprefixjej/g, re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix)}\``
        },
        // {
        //   name:`Module:`, 
        //   value:`${props.help.module}`
        // },
        {
          name:`Required ${props.help.access.mm ? "MM Permission" : "Permission Level"}:`, 
          value:`${props.help.access.mm ? props.help.access.mm : `${props.help.access.level} - ${re.vars.botperms[props.help.access.level]}`}`
        }
      ]
    if (props.help.alias && props.help.alias.length > 0)
      embed.fields.push({
        name: `Aliases:`,
        value: `\`${re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix}${props.help.alias.join("`, `" + re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix)}\``
});
    message.channel.send(embed);
  }
};


module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Get help for any command, or list all commands`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <command>`,
    alias:["command"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0, mm: null}
}
