const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:GS_Loading:719993838269104199>")
  await re.func.sleep(1000)
  let set = re.dbs.settings.get(message.guild.id)
  if(!args[0]){
  let embed = new re.Discord.MessageEmbed().setTitle("Galaxy Settings").setColor(re.config.color)
  .addField("Bot Settings", `Prefix: ${set.prefix || re.config.prefix}`)
  .addField("Unbelievaboat Settings", `Emoji: ${set.unb.emoji || "<:GS_DefaultUnb:719992863949062184>"}`)
  .addField("Role Settings", `Staff Roles: ${set.roles.staff.length > 0 ? `<@&${set.roles.staff.join(">, <@&")}>` : "No roles set"}\n` +
           `Mod Roles: ${set.roles.mod.length > 0 ? `<@&${set.roles.mod.join(">, <@&")}>` : "No roles set"}\n` +
           `Admin Roles: ${set.roles.admin.length > 0 ? `<@&${set.roles.admin.join(">, <@&")}>` : "No roles set"}`)
  .addField("Module Manager Settings", `Economy MM: ${set.mm.economy.length > 0 ? `<@&${set.mm.economy.join(">, <@&")}>` : "No roles set"}\n` +
           `Factions MM: ${set.mm.factions.length > 0 ? `<@&${set.mm.factions.join(">, <@&")}>` : "No roles set"}\n`)
  .addField("Channel Settings", `Galaxy Announcement Channel: ${set.channels.announcements ? `<#{set.channels.announcements}` : "No channel set"}\n` +
           `Suggestion Channel: ${set.channels.suggestions ? `<#${set.channels.suggestions}>` : "No channel set"}\n` +
           `1 Word Story Channel: ${`${set.channels.oneword ? `<#${set.channels.oneword}>` : "No channel set"}`}\n` +
           `Counting Channel: ${`${set.channels.counting ? `<#${set.channels.counting}>` : "No channel set"}`}\n`)
  m.edit(" ", embed)
  } else if(args[0] === "prefix") {
    re.dbs.settings.set(message.guild.id+".prefix", args.slice(1).join(" "))
    m.edit(`Success! You have changed this server's prefix to \`${args.slice(1).join(" ")}\``)
  } else if(args[0] === "emoji") {
    re.dbs.settings.set(message.guild.id+".unb.emoji", args.slice(1).join(" "))
    m.edit(`Success! You have changed this currency emoji to ${args.slice(1).join(" ")}`)
  } else if(args[0] === "role" || args[0] === "roles") {
    let type = args[1]
    if(type === "moderator") type = "mod"
    if(!["staff", "mod", "admin"].includes(type)) return await m.edit("That is not a valid role setting!")
    await m.edit("Please ping all the roles you want listed as " + type + " roles")
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content == "cancel") return await m.edit("Prompt timed out.")
    input = input.first()
    let roles = input.mentions.roles.map(x => x.id)
    input.delete()
    m.edit(`Success! You have set the roles for ${type} to ${input.mentions.roles.map(x => `<@&${x.id}>`).join(", ")}`)
    re.dbs.settings.set(message.guild.id+".roles."+type, roles)
  } else if(args[0] === "mm" || args[0] === "modulemanager") {
    let type = args[1]
    if(!["economy", "factions"].includes(type)) return await m.edit("That is not a valid MM setting!")
    await m.edit("Please ping all the roles you want listed as " + type + " MMs")
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content == "cancel") return await m.edit("Prompt timed out.")
    input = input.first()
    let roles = input.mentions.roles.map(x => x.id)
    input.delete()
    m.edit(`Success! You have set the roles for ${type} MM to ${input.mentions.roles.map(x => `<@&${x.id}>`).join(", ")}`)
    re.dbs.settings.set(message.guild.id+".mm."+type, roles)
  } else if(args[0] === "channel" || args[0] === "channels") {
    let type = args[1]
    if(["1word", "one-word"].includes[type]) type = "oneword"
    if(!["announcements", "suggestions", "oneword", "counting"].includes(type)) return await m.edit("That is not a valid channel setting!")
    await m.edit("Please ping the channel you want listed as " + type + " channel")
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content == "cancel") return await m.edit("Prompt timed out.")
    input = input.first()
    let channel = input.mentions.channels.first().id
    input.delete()
    m.edit(`Success! You have set the channel for ${type} MM to <#${channel}>`)
    re.dbs.settings.set(message.guild.id+".channels."+type, channel)
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Change or view the Galaxy Settings for your server`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <setting>`,
  alias: ["settings", "set"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 3, mm: null }
}
