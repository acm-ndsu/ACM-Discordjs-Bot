const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('batcomb')
        .setDescription('Prints a batcomb.'),
    async execute(interaction) {
        await interaction.reply({content: 'You spelt it wrong, Adam!'})
    }
};