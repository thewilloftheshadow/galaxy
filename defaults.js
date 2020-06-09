const re = require(`./resources.js`).data
const defunb = re.func.getEmoji("GS_DefaultUnb")

let d = {
  "prefix": "",
  "unb": {
    "emoji": defunb
  },
  "roles": {
    "staff": [],
    "mod": [],
    "admin": []
  },
  "mm": {
    "economy": [],
    "factions": []
  },
  "channels": {
    "announcements": "",
    "suggestions": ""
  },
  "setup": false
}

module.exports = d