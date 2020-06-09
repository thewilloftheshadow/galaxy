const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(3000)
  let uf = re.dbs.users.get(message.guild.id+"."+message.author.id+".faction")
  let f = re.dbs.factions.get(message.guild.id+"."+uf)
  if(!f) return await m.edit(`You aren't in a faction!`)
  
  
  
  await m.edit(`Are you sure you want to leave your faction?`)
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
      if (reaction.id != "678023486618468363") return await m.edit("Ok, we won't leave that faction then")
  
  let newmem = re.vars.ap(f.members, message.author.id)
  re.dbs.factions.set(message.guild.id+"."+f.id+".members", newmem)
  re.dbs.users.delete(message.guild.id+"."+message.author.id+".faction")
  message.member.roles.remove(f.ids.role, `User left faction`)
  await m.edit(`<@${message.author.id}> has left their faction!`)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Leave your faction",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["leavef", "leavesect"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0, mm: null}
}