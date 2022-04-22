const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock')
        .setDescription('Returns the sentence in Spongebob mock-case.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to change to mock-case')
                .setRequired(true)),
    async execute(interaction) {
        text = interaction.options.getString('text');

        returnMessage = "";
        for(var i = 0; i < text.length; i++) {
            if (i % 2 == 0) {
                returnMessage += text[i].toLowerCase();
            } else {
                returnMessage += text[i].toUpperCase();
            }
        }

        await interaction.reply(returnMessage);
    },
};