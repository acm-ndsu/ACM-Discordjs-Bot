const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('hug'),
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hugs target and counts how many times they have been hugged')
        .addSubcommand(subcommand =>
            subcommand.setName('target')
                .setDescription('Hugs target')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('target to hug')))
        .addSubcommand(subcommand =>
            subcommand.setName('count')
                .setDescription('Responds with number of times you have been hugged')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'count') {
            hasCounts = this.state.counts && this.state.counts[interaction.user.id];
            if (hasCounts) {
                await interaction.reply(`${interaction.user} has been hugged ${this.state.counts[interaction.user.id]} times`);
            } else {
                await interaction.reply('No hugs for you. So far...');
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
            "{0} hugs {1}.",
            "{0} hugs {1}. *There there...*",
            "{0} hugs {1}. *It will all be better soon...*",
            "{0} hugs {1}. *You'll float too....*",
        ]);

        await interaction.reply({ content: phrase.format(interaction.user, target)})

        utilities.saveState('hug', this.state);
    },
};