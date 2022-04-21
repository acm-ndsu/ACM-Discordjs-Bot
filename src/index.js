const fs = require('node:fs')
const path = require('path')
const { Client, Collection, Intents, ClientUser } = require('discord.js');
const { token } = require('../config.json');

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match;
		});
	};
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection()
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(path.resolve(__dirname, `./commands/${file}`));
	// set a new item in the collection
	// with the key as the command name and the value as the export module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
	}
});

// Login to Discord with your client's token
client.login(token);
