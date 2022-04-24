# ACM Discord Bot 

## Contributing

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

## Running Robbot

To run Robbot, make sure you have Node v16.6.0 or higher installed. Before running, make sure you install dependencies by running `npm install`. Then run `npm start`. This will run both `deploy-commands.js`, which registers the commands with the server, and `index.js` which runs the actual server. If for some reason you don't want both to run together, they can be run seperately by running `node <filename>`.

You will also need to setup a `config.json` file. In this you'll need to put your bot's private token key, your public clientID, and the server's public guildId in this format:

```json
{
    "token": "<token-here>"
    "clientId": "<clientID-here>"
    "guildId": "<guildID-here>"
}
```

If the application is run in a terminal, the terminal window will need to stay open for the bot to continue running. If the bot unexpectedly goes down, this is the first thing to check.
