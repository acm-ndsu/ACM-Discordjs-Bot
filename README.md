# ACM Discord Bot 

To extend the bot, create a .js file with a module export in ```src/commands/```. Here's an example:

```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
```

`data` must be of type `SlashCommandBuilder` and execute is where your logic goes. Checkout the link to discord.js below for a guide with more information.

To contribute, please fork the project, make your changes, commit them, and create a pull request. Unfortunatly for security reasons we cannot provide an api token for the bot in source control so you will be unable to test the code yourself on our server. As such the pull request will give us a chance to pull your code and make sure it works. When creating a pull request, please make sure to document what the extension does.

If you wish to test during development on your own server, you can use [this](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) guide to create your own bot on your own server. 

Robbot is built with [discord.js](https://discord.js.org/#/)
