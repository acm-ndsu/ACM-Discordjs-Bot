const { SlashCommandBuilder } = require('@discordjs/builders')
const cowsay = require('cowsay')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cowsay')
        .setDescription('Makes a cow say your message')
        .addStringOption(option =>
            option.setName('message').setDescription('message to make a cow say')),
    async execute(interaction) {
        await interaction.reply(cowsay.say({
            text: interaction.options.getString('message'),
            e : "oO",
            T : "U "
        }))
    },
};