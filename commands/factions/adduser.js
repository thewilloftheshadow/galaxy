const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let f
  if(message.member.roles.cache.has("712297438014078986")) f = re.dbs.factions.get("mf")
  if(message.member.roles.cache.has("712709938161647748")) f = re.dbs.factions.get("pakistan")
  if(message.member.roles.cache.has("712783175306444910")) f = re.dbs.factions.get("at")
  if(!f) return await m.edit(`You aren't in a faction!`)
  
  if(f.leader != message.author.id) return await m.edit("You aren't the leader of your faction!")
  if(!args[0]) return await m.edit("You need to choose someone to add to your faction!")
  
  let user = re.func.getuser(args.join(" "), message)
  if(!user) return await m.edit("That user was not found!")
  if(f.members.includes(user.id)) return await m.edit("That user is already in your faction!")
  
  await m.edit(`Are you sure you want to add <@${user.id}> to your faction?`)
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
      if (reaction.id != "678023486618468363") return await m.edit("Ok, I won't add them then")
  
  re.dbs.factions.push(f.id+".members", user.id)
  user.roles.add(f.ids.role, `Added to faction by ${message.author.tag}`)
  await m.edit(`Done! <@${user.id}> has been added to your faction!`)
};

module.exports.help = {
  name: "adduser",
  description: "Add a user to your faction",
  syntax: re.config.prefix + "adduser <user>",
  alias: ["addmember"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: false, dev: false, owner: false}
};