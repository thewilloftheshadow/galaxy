const config = require(`./config.json`)
const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const logs = new Discord.WebhookClient("716482964602749000", process.env.LOGS)
const unbapi = require(`unb-api`)
const func = {
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  prettyNumber: function(number) {
    if (!typeof number === "string") number = number.toString()
    number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },
  capitalizeFirstLetter: function(string) {
    if (typeof string == undefined) return
    var firstLetter = string[0] || string.charAt(0)
    return firstLetter ? string.replace(/^./, firstLetter.toUpperCase()) : ""
  },
  clean: function(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
    else return text
  },
  formatClean: function(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "")
        .replace(/@/g, "@" + String.fromCharCode(8203))
    else return text
  },
  getRandom: function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  capFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  getMemoryUsage: function() {
    let total_rss = require("fs")
      .readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8")
      .split("\n")
      .filter(l => l.startsWith("total_rss"))[0]
      .split(" ")[1]
    return (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)
  },
  stats: function() {
    let membercount = client.guilds.cache.get(config.server).members.cache.size
    client.channels.cache
      .get("712719001196822538")
      .setName(`╔👥║ Members: ${membercount}`)

  },
  botperms: function(userid, message){
    if(userid instanceof Discord.GuildMember) userid = userid.id
    if(userid instanceof Discord.User) userid = userid.id
    let perms = {
      level: 0,
      modules: [],
      eval: false
    }
    if(message.guild){
      let staffroles = dbs.settings.get(message.guild.id+".roles.staff")
      let modroles = dbs.settings.get(message.guild.id+".roles.mod")
      let adminroles = dbs.settings.get(message.guild.id+".roles.admin")
      staffroles.forEach(x => {
        if(message.member.roles.cache.has(x)) perms.level = 1
      })
      modroles.forEach(x => {
        if(message.member.roles.cache.has(x)) perms.level = 2
      })
      adminroles.forEach(x => {
        if(message.member.roles.cache.has(x)) perms.level = 3
      })
      if(message.member.hasPermission("MANAGE_MESSAGES") && modroles.length) perms.level = 2
      if(message.member.hasPermission("MANAGE_SERVER") && adminroles.length) perms.level = 3
    }
    if(message.client.guilds.cache.get(config.support).members.cache.get(userid).roles.cache.has("717162873406881822")) perms.level = 4
    if(message.client.guilds.cache.get(config.support).members.cache.get(userid).roles.cache.has("716426400738836557")) perms.level = 5
    //if(userid === config.ownerID) perms.level = 6
    if(message.client.guilds.cache.get(config.support).members.cache.get(userid).roles.cache.has("719334282023272498")) perms.eval = true
    
    return perms
  },
  itemembed: function(itemid, guildid) {
    if (!itemid) throw new Error("Please specify an item ID!")
    const item = dbs.items.get(guildid + "." + itemid)
    const embed = new Discord.MessageEmbed()
    if (!item)
      embed
        .setTitle("Item not found")
        .setDescription(
          "Unable to find information for an item with the ID of " + item.id
        )
    embed
      .setTitle(`Item info for ${item.name}`)
      .addField(
        "Price",
        `${
          dbs.settings.get(guildid + ".unb.emoji")
            ? dbs.settings.get(guildid + ".unb.emoji")
            : "<a:TCKC_MoneyBag:710609208286117898>"
        } ${item.price}`
      )
    if (item.damage > 0) embed.addField("Damage", `${item.damage}`)
    if (item.heal > 0) embed.addField("Heal", `${item.heal}`)
    if (item.addhealth > 0) embed.addField("Health Boost", `${item.addhealth}`)
    return embed
  },
  hp: function(userid, guildid) {
    let hp = dbs.users.get(guildid + "." + userid + ".hp")
    if (!hp) {
      hp = 50
      dbs.users.set(guildid + "." + userid + ".hp", 50)
    }
    return hp
  },
  getuser: function(input, message) {
    if (!input) return message.member
    let target = message.mentions.members.first()
    if (target == null) {
      target = message.guild.members.cache.find(
        member =>
          member.user.tag === input ||
          member.user.id === input ||
          member.user.username === input ||
          (member.nickname !== null && member.nickname === input)
      )
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        member =>
          member.user.username.toLowerCase() +
            "#" +
            member.user.discriminator ===
            input.toLowerCase() ||
          member.user.username.toLowerCase() === input.toLowerCase() ||
          (member.nickname !== null &&
            member.nickname.toLowerCase() === input.toLowerCase())
      )
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        member =>
          member.user.username.startsWith(input) ||
          member.user.username.toLowerCase().startsWith(input.toLowerCase())
      )
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        member =>
          (member.nickname !== null && member.nickname.startsWith(input)) ||
          (member.nickname !== null &&
            member.nickname.toLowerCase().startsWith(input.toLowerCase()))
      )
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        member =>
          member.user.username.toLowerCase().includes(input.toLowerCase()) ||
          (member.nickname !== null &&
            member.nickname.toLowerCase().includes(input.toLowerCase()))
      )
    }
    return target
  },
  paginator: async (author, msg, embeds, pageNow, addReactions = true) => {
    if (embeds.length === 1) return
    if (addReactions) {
      await msg.react("⏪")
      await msg.react("◀")
      await msg.react("▶")
      await msg.react("⏩")
    }
    let reaction = await msg
      .awaitReactions(
        (reaction, user) =>
          user.id == author &&
          ["◀", "▶", "⏪", "⏩"].includes(reaction.emoji.name),
        { time: 30 * 1000, max: 1, errors: ["time"] }
      )
      .catch(() => {})
    if (!reaction) return msg.reactions.removeAll().catch(() => {})
    reaction = reaction.first()
    //console.log(msg.member.users.tag)
    if (
      msg.channel.type == "dm" ||
      !msg.guild.me.hasPermission("MANAGE_MESSAGES")
    ) {
      if (reaction.emoji.name == "◀") {
        let m = await msg.channel.send(embeds[Math.max(pageNow - 1, 0)])
        msg.delete()
        func.paginator(author, m, embeds, Math.max(pageNow - 1, 0))
      } else if (reaction.emoji.name == "▶") {
        let m = await msg.channel.send(
          embeds[Math.min(pageNow + 1, embeds.length - 1)]
        )
        msg.delete()
        func.paginator(
          author,
          m,
          embeds,
          Math.min(pageNow + 1, embeds.length - 1)
        )
      } else if (reaction.emoji.name == "⏪") {
        let m = await msg.channel.send(embeds[0])
        msg.delete()
        func.paginator(author, m, embeds, 0)
      } else if (reaction.emoji.name == "⏩") {
        let m = await msg.channel.send(embeds[embeds.length - 1])
        msg.delete()
        func.paginator(author, m, embeds, embeds.length - 1)
      }
    } else {
      if (reaction.emoji.name == "◀") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[Math.max(pageNow - 1, 0)])
        func.paginator(author, m, embeds, Math.max(pageNow - 1, 0), false)
      } else if (reaction.emoji.name == "▶") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[Math.min(pageNow + 1, embeds.length - 1)])
        func.paginator(
          author,
          m,
          embeds,
          Math.min(pageNow + 1, embeds.length - 1),
          false
        )
      } else if (reaction.emoji.name == "⏪") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[0])
        func.paginator(author, m, embeds, 0, false)
      } else if (reaction.emoji.name == "⏩") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[embeds.length - 1])
        func.paginator(author, m, embeds, embeds.length - 1, false)
      }
    }
  },
  hpemoji: function(hp) {
    const empty1 = client.emojis.cache.get("718508401315020810")
    const full1 = client.emojis.cache.get("718508515475325069")
    const empty2 = client.emojis.cache.get("718508550405750856")
    const half2 = client.emojis.cache.get("718508539039055951")
    const full2 = client.emojis.cache.get("718508527001272332")
    const empty3 = client.emojis.cache.get("718508628872658957")
    const half3 = client.emojis.cache.get("718508654667759777")
    const full3 = client.emojis.cache.get("718508808246263860")
    hp = parseInt(hp, 10)
    if(!hp) return "<:GS_WaitWhat:718509174652272663>"
    let string = `${hp < 10 ? empty1 : full1}${
      hp < 20 ? (hp < 15 ? empty2 : half2) : full2
    }${hp < 30 ? (hp < 25 ? empty2 : half2) : full2}${
      hp < 40 ? (hp < 35 ? empty2 : half2) : full2
    }${hp < 50 ? (hp < 45 ? empty3 : half3) : full3}`
    return string
  },
  randomString: function(len) {
    let buf = [],
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charlen = chars.length

    for (var i = 0; i < len; ++i) {
      buf.push(chars[func.getRandom(0, charlen - 1)])
    }

    return buf.join("")
  },
  getEmoji: function(client, name) {
    return client.emojis.cache.find(
      emoji => emoji.name.toLowerCase() == name.toLowerCase().replace(/ /g, "_")
    )
  }
}
const vars = {
  http: require(`http`),
  express: require(`express`),
  Discord: require(`discord.js`),
  config: require(`./config.json`),
  db: require(`quick.db`),
  cmd: require(`node-cmd`),
  fs: require(`fs`),
  ms: require(`ms`),
  shortid: require("shortid"),
  ap: require("array-pull"),
  minesweeper: require("discord.js-minesweeper"),
  ejs: require("ejs"),
  Strategy: require("passport-discord").Strategy,
  session: require("express-session"),
  passport: require("passport"),
  fs: require("fs"),
  moment: require("moment"),
  permlist: {
    "0x00000001": "CREATE_INSTANT_INVITE",
    "0x00000002": "KICK_MEMBERS",
    "0x00000004": "BAN_MEMBERS",
    "0x00000008": "ADMINISTRATOR",
    "0x00000010": "MANAGE_CHANNELS",
    "0x00000020": "MANAGE_GUILD",
    "0x00000040": "ADD_REACTIONS",
    "0x00000080": "VIEW_AUDIT_LOG",
    "0x00000400": "VIEW_CHANNEL",
    "0x00000800": "SEND_MESSAGES",
    "0x00001000": "SEND_TTS_MESSAGES",
    "0x00002000": "MANAGE_MESSAGES",
    "0x00004000": "EMBED_LINKS",
    "0x00008000": "ATTACH_FILES",
    "0x00010000": "READ_MESSAGE_HISTORY",
    "0x00020000": "MENTION_EVERYONE",
    "0x00040000": "USE_EXTERNAL_EMOJIS",
    "0x00100000": "CONNECT",
    "0x00200000": "SPEAK",
    "0x00400000": "MUTE_MEMBERS",
    "0x00800000": "DEAFEN_MEMBERS",
    "0x01000000": "MOVE_MEMBERS",
    "0x02000000": "USE_VAD",
    "0x00000100": "PRIORITY_SPEAKER",
    "0x00000200": "STREAM",
    "0x04000000": "CHANGE_NICKNAME",
    "0x08000000": "MANAGE_NICKNAMES",
    "0x10000000": "MANAGE_ROLES",
    "0x20000000": "MANAGE_WEBHOOKS",
    "0x40000000": "MANAGE_EMOJIS"
  }
}
//Database tables
const dbs = {
  modmail: new vars.db.table("modmail"),
  cd: new vars.db.table("cd"),
  suggestions: new vars.db.table("suggestions"),
  factions: new vars.db.table("factions"),
  users: new vars.db.table("users"),
  snipe: new vars.db.table("snipe"),
  items: new vars.db.table("items"),
  settings: new vars.db.table("settings"),
  authdb: new vars.db.table("authdb")
}

dbs.list = Object.getOwnPropertyNames(dbs)
vars.list = Object.getOwnPropertyNames(vars)
func.list = Object.getOwnPropertyNames(func)

const app = vars.express()
const prefix = config.prefix

exports.data = {
  func: func,
  vars: vars,
  prefix: prefix,
  dbs: dbs,
  app: app,
  unb: new unbapi.Client(process.env.UNB),
  client: client,
  Discord: Discord,
  config: vars.config,
  handybag: require("handybag"),
  logs: logs,
  moment: require("moment")
}

exports.data.list = Object.getOwnPropertyNames(exports.data)
