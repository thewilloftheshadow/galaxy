const re = require(`../resources.js`).data;
re.client.on("guildMemberRemove", async member => {
  const channel = re.client.guilds.cache
    .get(re.config.server)
    .channels.cache.get("652530741590097930");
  channel
    .messages.fetch({
      limit: 100
    })
    .then(messages => {
      messages = messages
        .filter(m => m.author.id === member.id)
        .array()
        .slice(0, 1000);
      channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
  re.client.emit("botlog", "Cleared messages from <#652530741590097930> from <@" + member.id + "> because they left the server")
});
