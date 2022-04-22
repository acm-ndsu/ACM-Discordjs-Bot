const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock')
        .setDescription('Returns the sentence in Spongebob mock-case.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to change to mock-case')),
    async execute(interaction) {
        text = interaction.options.getString('text');

        increment = 1;
        returnMessage = "";
        for(var i = 0; i < text.length; i++) {
            if (increment % 2 == 0) {
                returnMessage += text[i].toLower();
            } else {
                returnMessage += text[i].toUpper();
            }
            increment++;
        }

        await interaction.reply(returnMessage);
    },
};