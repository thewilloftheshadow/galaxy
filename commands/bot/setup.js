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
           `Factions MM: ${set.mm.factions.length > 0 ? `<@&${set.mm.factions.join(">, <@&")}>` : "No roles set"}\n` +
           `Levels MM: ${set.mm.levels.length > 0 ? `<@&${set.mm.levels.join(">, <@&")}>` : "No roles set"}\n`)
  .addField("Channel Settings", `Galaxy Announcement Channel: ${set.channels.announcements ? `<#${set.channels.announcements}>` : "No channel set"}\n` +
           `Suggestion Channel: ${set.channels.suggestions ? `<#${set.channels.suggestions}>` : "No channel set"}\n` +
           `1 Word Story Channel: ${`${set.channels.oneword ? `<#${set.channels.oneword}>` : "No channel set"}`}\n` +
           `Counting Channel: ${`${set.channels.counting ? `<#${set.channels.counting}>` : "No channel set"}`}\n` +
           `Welcome Channel: ${`${set.channels.welcome ? `<#${set.channels.welcome}>` : "No channel set"}`}\n` +
           `Goodbye Channel: ${`${set.channels.goodbye ? `<#${set.channels.goodbye}>` : "No channel set"}`}\n`)
  .addField("Automessages:", `Welcome: ${set.msg.welcome ? "Message set" : "No message set"}\n` + 
            `Goodbye: ${set.msg.goodbye ? "Message set" : "No message set"}\n` + 
            `Custom: ${set.msg.custom.length} custom messages`)
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
    if (!input || input.first().content.toLowerCase() == "cancel") return await m.edit("Prompt canceled.")
    input = input.first()
    let roles = input.mentions.roles.map(x => x.id)
    input.delete()
    m.edit(`Success! You have set the roles for ${type} to ${input.mentions.roles.map(x => `<@&${x.id}>`).join(", ")}`)
    re.dbs.settings.set(message.guild.id+".roles."+type, roles)
  } else if(args[0] === "mm" || args[0] === "modulemanager") {
    let type = args[1]
    if(type === "leveling") type = "levels"
    if(!["economy", "factions", "levels"].includes(type)) return await m.edit("That is not a valid MM setting!")
    await m.edit("Please ping all the roles you want listed as " + type + " MMs")
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content.toLowerCase() == "cancel") return await m.edit("Prompt canceled.")
    input = input.first()
    let roles = input.mentions.roles.map(x => x.id)
    input.delete()
    m.edit(`Success! You have set the roles for ${type} MM to ${input.mentions.roles.map(x => `<@&${x.id}>`).join(", ")}`)
    re.dbs.settings.set(message.guild.id+".mm."+type, roles)
  } else if(args[0] === "channel" || args[0] === "channels") {
    let type = args.slice(1).join(" ")
    if(["announcement", "galaxyannouncement", "massannounce"].includes(type)) type = "announcements"
    if(["1word", "one-word", "oneword", "ows", "one word story"].includes(type)) type = "onewordstory"
    if(["joining", "join", "welcomes"].includes(type)) type = "welcome"
    if(["leave", "leaving", "good-bye"].includes(type)) type = "goodbye"
    if(!["announcements", "suggestions", "onewordstory", "counting", "welcome", "goodbye"].includes(type)) return await m.edit("That is not a valid channel setting!")
    await m.edit(`Please ping the channel(s) you want listed as ${type == "onewordstory" ? "One Word Story" : type} channel(s)`)
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content.toLowerCase() == "cancel") return await m.edit("Prompt canceled.")
    input = input.first()
    let channel = input.mentions.channels.map(x => x.id)
    input.delete()
    m.edit(`Success! You have set the channel(s) for ${type} to ${input.mentions.channels.map(x => `<#${x.id}>`).join(", ")}`)
    re.dbs.settings.set(message.guild.id+".channels."+type, channel)

    if(type === "counting"){
      re.dbs.games.set(message.guild.id+".counting."+channel, {
        lastid: null,
        nextnum: 1,
        lastnum: 0
      })
      re.client.channels.cache.get(channel).setTopic(`Counting by Galaxy`)
    }

    if(type === "onewordstory"){
      re.dbs.games.set(message.guild.id+".onewordstory."+channel, {
        lastid: null,
        story: ""
      })
      re.client.channels.cache.get(channel).setTopic(`One Word Story by Galaxy`)
    }
  } else if(["message", "messages", "msg"].includes(args[0])) {
    let type = args.slice(1).join(" ")
    if(["leave", "good-bye"].includes(type)) type = "goodbye"
    if(["join", "new"].includes(type)) type = "welcome"
    if(!["welcome", "goodbye"].includes(type)) return await m.edit("That is not a valid message setting!")
    await m.edit(`Please send your ${type} message now. Keep in mind that ${re.client.user.username} has to be the same server as a custom emoji for it to be used properly.`)
    let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!input || input.first().content.toLowerCase() == "cancel") return await m.edit("Prompt canceled.")
    input = input.first()
    let newmsg = input.content
    input.delete()
    m.edit(`Success! You have set the ${type} message for ${type} to the following:\n\n${newmsg}`)
    re.dbs.settings.set(message.guild.id+".msg."+type, newmsg)
  } else {
    m.edit("Invalid command option! The available options are these:\n```fix\nprefix, emoji, role, channel, mm, message\n```")
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
