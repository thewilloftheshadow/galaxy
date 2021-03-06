const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let uf = re.dbs.users.get(message.guild.id+"."+message.author.id+".faction")
  let f = re.dbs.factions.get(message.guild.id+"."+uf)
  if(!f) return await m.edit(`You aren't in a faction!`)
  
  if(f.leader != message.author.id) return await m.edit("You aren't the leader of your faction!")
  if(!args[0]) return await m.edit("You need to choose someone to remove from your faction!")
  
  let user = re.func.getuser(args.join(" "), message)
  if(!user) return await m.edit("That user was not found!")
  if(!f.members.includes(user.id)) return await m.edit("That user isn't in your faction!")
  
  await m.edit(`Are you sure you want to remove <@${user.id}> from your faction?`)
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
  
  let newmem = re.vars.ap(f.members, user.id)
  re.dbs.factions.set(message.guild.id+"."+f.id+".members", newmem)
  re.dbs.users.delete(message.guild.id+"."+user.id+".faction")
  if(f.ids && f.ids.role) user.roles.remove(f.ids.role, `Removed from faction by ${message.author.tag}`)
  await m.edit(`Done! <@${user.id}> has been removed from your faction!`)
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Remove a user from your faction",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["removemember"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}