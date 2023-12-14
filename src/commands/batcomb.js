const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('batcomb')
        .setDescription('Prints a batcomb.'),
    async execute(interaction) {
        if(interaction.user.id === '137754149210030080' && Math.floor(Math.random() * 4))
            await interaction.reply({content: 'You spelt it wrong, Adam!'})
        else if(interaction.user.id === '138738295063576576' && Math.floor(Math.random() * 4))
            await interaction.reply({content: 'You spelt it wrong, Eric!'})
        else
            await interaction.reply({files: [{attachment: 'persistence/batcomb.png'}]})
    }
};