const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('slap'),
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slaps target and counts how many times they have been slapped')
        .addSubcommand(subcommand =>
            subcommand.setName('target')
                .setDescription('Slaps target')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('target to slap')))
        .addSubcommand(subcommand =>
            subcommand.setName('count')
                .setDescription('Responds with number of times you have been slapped')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'count') {
            hasCounts = this.state.counts && this.state.counts[interaction.user.id];
            if (hasCounts) {
                await interaction.reply(`${interaction.user} has been slapped ${this.state.counts[interaction.user.id]} times`);
            } else {
                await interaction.reply("People must like you, you haven't been slapped. Yet.");
            }
            return;
        }
        if (!this.state.counts) {
            this.state.counts = {};
        }

        const target = interaction.options.getUser('target');
        
        if (!this.state.counts[target.id]) {
            this.state.counts[target.id] = 0;
        }

        this.state.counts[target.id] += 1;

        phrase = utilities.choose([
            "{0} slaps {1} with a trout.",
            "{0} beats {1} with a wet noodle.",
            "{0} slaps {1} around a bit with a large trout.",
            "{0} slaps {1} around a bit with a diet trout small.",
            "{0} slaps {1} around a bit with a trout small.",
            "{0} slaps {1} around a bit with a minnow"
        ]);

        await interaction.reply({ content: phrase.format(interaction.user, target)})

        utilities.saveState('slap', this.state);
    },
};