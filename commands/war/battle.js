const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let m = await message.channel.send("<a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)

  let user1 = message.member
  if (!args[0]) return m.edit("You must specify someone to battle!")
  let user2 = re.func.getuser(args.join(" "), message)
  if (!user2) return await m.edit(`Unable to find that user`)
  
  await user2
    .send(
      new re.Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(
          `[${message.author.username} has challenged you to a battle!](https://discord.com/channels/${message.guild.id}/${message.channel.id}/{m.id} "Click here to accept the challenge!")`
        )
    )
    .catch(e => {})
  
  await m.edit(
    `${user2}, ${message.member.displayName} has challenged you to a battle! Do you accept?`
  )
  await m.react("678023486618468363")
  await m.react("684155550728192019")
  let reactions = await m
    .awaitReactions(
      (r, u) =>
        ["678023486618468363", "684155550728192019"].includes(r.emoji.id) &&
        u.id == user2.id,
      { time: 120 * 1000, max: 1, errors: ["time"] }
    )
    .catch(() => {})
  await m.reactions.removeAll()
  if (!reactions) return await m.edit("Prompt timed out")
  let reaction = reactions.first().emoji
  if (reaction.id != "678023486618468363")
    return await m.edit("Battle declined!")
  await m.edit("Battle accepted! Generating battlefield <a:TCKC_RainbowLoad:688544088072650821>")
  await re.func.sleep(1500)
  let bf = new re.Discord.MessageEmbed().setTitle("The Battlefield")
  let user1hp = re.func.hp(message.guild.id, user1.id)
  let user2hp = re.func.hp(message.guild.id, user2.id)
  bf.setDescription(`${user1}, its your turn! Select an emoji below for your action`)
  bf.addField(`${user1.displayName}\s Health: `, `${re.func.hp(user1.id, message.guild.id)}hp - ${re.func.hpemoji(re.func.hp(user1.id, message.guild.id))}`)
  bf.addField(`${user2.displayName}\s Health: `, `${re.func.hp(user2.id, message.guild.id)}hp - ${re.func.hpemoji(re.func.hp(user2.id, message.guild.id))}`)
  await m.edit(`${user1} ${user2}`, bf)
  
}

module.exports.help = {
  name: "battle",
  description: "Battle another user",
  syntax: re.config.prefix + "hp",
  alias: ["health"],
  module: "war",
  access: {
    staff: false,
    mod: false,
    ecomanage: false,
    dev: false,
    owner: false
  }
}
