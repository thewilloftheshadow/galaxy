const re = require(`../../resources.js`).data;
module.exports.run = async (client, message, args) => {
  let item = {
    name: "",
    id: "",
    price: "",
    damage: 0,
    heal: 0,
    addhealth: 0,
    effects: []
  };
  
  while (!item.name) {
    let m = message.channel.send(
      "Yay its time to make a new item! What do you want to call this item?"
    );
    
  }
};

module.exports.help = {
  name: "newitem",
  description: "Add an item to the shop",
  syntax: re.config.prefix + "additem",
  alias: ["newitem"],
  module: "factions",
  access: {staff: false, mod: false, ecomanage: true, dev: false, owner: false}
};

