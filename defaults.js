const re = require(`./resources.js`).data
const defunb = re.func.getEmoji("GS_DefaultUnb")

let d = {
  "prefix": "",
  "unb": {
    "emoji": `<:GS_DefaultUnb:719992863949062184>`
  },
  "roles": {
    "staff": [],
    "mod": [],
    "admin": [],
    "welcome": [],
    "goodbye": []
  },
  "mm": {
    "economy": [],
    "factions": [],
    "levels": []
  },
  "channels": {
    "announcements": "",
    "suggestions": "",
    "oneword": "",
    "counting": "",
    "welcome": "",
    "goodbye": "",
    "advertising": ""
  },
  "msg": {
    "welcome": "",
    "goodbye": "",
    "custom": []
  },
  "setup": false
}

module.exports = d