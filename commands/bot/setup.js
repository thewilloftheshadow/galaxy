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
  .addField("Channel Settings", `Galaxy Announcement Channel: ${`<#${set.channels.announcements}>` || "No channel set"}\n` +
           `Suggestion Channel: ${`<#${set.channels.suggestions}>` || "No channel set"}\n` +
           `1 Word Story Channel: ${`<#${set.channels.oneword ? set.channels.oneword : "No channel set"}>`}\n` +
           `Counting Channel: ${`<#${set.channels.counting}>` || "No channel set"}\n`)
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
    
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input) return await m.edit("Prompt timed out.")
    input = input.first().content
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Change or view the Galaxy Settings for your server`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["settings", "set"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 3, mm: null }
}
