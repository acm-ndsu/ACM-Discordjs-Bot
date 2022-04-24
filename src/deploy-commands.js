const path = require('path');
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

console.log("Registering application commands...");

const commands = []
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands'))
							.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.resolve(__dirname, `./commands/${file}`))
	commandJson = command.data.toJSON();
	if (command.permissions) {
		commandJson.default_permission = false;
		commandJson.permissions = command.permissions;
	}
	commands.push(commandJson);
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.\n'))
	.catch(console.error);
