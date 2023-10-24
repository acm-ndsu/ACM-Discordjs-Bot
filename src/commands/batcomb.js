const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('batcomb')
        .setDescription('Prints a batcomb.'),
    async execute(interaction) {
        if(interaction.user.id === '137754149210030080')
            await interaction.reply({content: 'You spelt it wrong, Adam!'})
        else
            await interaction.reply({files: [{attachment: 'persistence/batcomb.png'}]})
    }
};