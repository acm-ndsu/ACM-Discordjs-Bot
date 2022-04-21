const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('totoro')
        .setDescription('Draws a totoro'),
    async execute(interaction) {
        msg = ` \`\`\`
        _____
       /     \\
       vvvvvvv  /|__/|
          I   /O,O   |
          I /_____   |      /|/|
         J|/^ ^ ^ \  |    /00  |    _//|
          |^ ^ ^ ^ |W|   |/^^\ |   /oo |
           \m___m__|_|    \m_m_|   \mm_|
      
                  \`\`\`
                  `
        interaction.reply(msg);
    },
};