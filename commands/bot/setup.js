const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  if(!message.member.hasPermission("MANAGE_SERVER")/* && (re.dbs.settings.get(message.guild.id+".roles.admin") && !message.member.roles.cache.has(re.dbs.settings.get(message.guild.id+".roles.admin")))*/) return await m.edit(`Only someone with the \`Manage Server\` permission /*or the <@&${re.dbs.settings.get(message.guild.id+".roles.admin")}> can setup the bot!`)
  if(re.dbs.settings.get(message.guild.id+".setup")){
    await m.edit(`Are you sure you want to rerun the setup?`)
  await m.react("678023486618468363")
  await m.react("684155550728192019")
  let reactions = await m
        .awaitReactions(
          (r, u) =>
            (["678023486618468363","684155550728192019"].includes(r.emoji.id)) &&
            u.id == message.author.id,
          { time: 30 * 1000, max: 1, errors: ["time"] }
        )
        .catch(() => {})
      if (!reactions)
        return await m.edit("Prompt timed out")
      let reaction = reactions.first().emoji
      await m.reactions.removeAll()
      if (reaction.id != "678023486618468363") return await m.edit("Ok, we won't do the setup again")
  }
  
  m.edit = await message.channel.send(
    "Nice! Welcome to the Galaxy setup. First, what is the emoji for this server's currency? If you don't have one, say `skip`"
  )
  let input = await m.channel
    .awaitMessages(msg => msg.author.id == message.author.id, {
      time: 30 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
  if (!input) return await message.author.send(m.edit("Prompt timed out."))
  input = input.first().content
  re.dbs.settings.set(message.guild.id+".unb.emoji", input)
  input = ""
  
  m.edit = await message.channel.send(
    'Cool! Next, please ping all the roles you want considered as "staff" roles for this server, able to use command in the staff module!'
  )
  let roles = []
  while (!roles) {
    input = await m.channel
      .awaitMessages(msg => msg.author.id == message.author.id, {
        time: 30 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!input) return await message.author.send(m.edit("Prompt timed out."))
    input = input.first()
    if (!input.mentions.roles.first()) {
      m.edit("Please specify at least one role!")
    } else {
      input.mentions.roles.forEach(x => roles.push(x.id))
      re.dbs.settings.set(message.guild.id + ".roles.staff", roles)
    }
  }
  
  m.edit = await message.channel.send(
    'Epic! Next, please ping all the roles you want considered as "mod" roles for this server, able to use command in the mod module!'
  )
  roles = []
  while (!roles) {
    input = await m.channel
      .awaitMessages(msg => msg.author.id == message.author.id, {
        time: 30 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!input) return await message.author.send(m.edit("Prompt timed out."))
    input = input.first()
    if (!input.mentions.roles.first()) {
      m.edit("Please specify at least one role!")
    } else {
      input.mentions.roles.forEach(x => roles.push(x.id))
      re.dbs.settings.set(message.guild.id + ".roles.mod", roles)
    }
  }
  
   m.edit = await message.channel.send(
    'Awesome! Next, please ping all the roles you want considered as "admin" roles for this server, able to manage the bot\'s settings!'
  )
  roles = []
  while (!roles) {
    input = await m.channel
      .awaitMessages(msg => msg.author.id == message.author.id, {
        time: 30 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!input) return await message.author.send(m.edit("Prompt timed out."))
    input = input.first()
    if (!input.mentions.roles.first()) {
      m.edit("Please specify at least one role!")
    } else {
      input.mentions.roles.forEach(x => roles.push(x.id))
      re.dbs.settings.set(message.guild.id + ".roles.admin", roles)
    }
  }
  
   m.edit = await message.channel.send(
    'Woohoo! You\'re all set to use the bot now!'
  )
}

module.exports.help = {
  name: "newitem",
  description: "Add an item to the shop",
  syntax: re.config.prefix + "additem",
  alias: ["createitem"],
  module: "economymanager",
  access: {
    staff: false,
    mod: false,
    ecomanage: true,
    dev: false,
    owner: false
  }
}
