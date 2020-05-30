const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
};

module.exports.help = {
  name: "newitem",
  description: "Add an item to the shop",
  syntax: re.config.prefix + "additem",
  alias: ["newitem"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: true, dev: false, owner: false}
};

const item = {
  name: "",
  id: "",
  price: "",
  damage: 0,
  heal: 0,
  addhealth: 0,
  effects: []
}