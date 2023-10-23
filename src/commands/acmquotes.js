const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('acmquotes'),
    data: new SlashCommandBuilder()
        .setName('acmquotes')
        .setDescription('acmquotesmanager')
        .addSubcommand(subcommand =>
            subcommand.setName('new')
                .setDescription('Add new quote')
                .addUserOption(option =>
                    option.setName('quote')
                        .setDescription('quote to create')))
        .addSubcommand(subcommand =>
            subcommand.setName('print')
                .setDescription('prints a random ACM Quote')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'print') {
            const hasQuotes = this.state.quotes;
            if (hasQuotes) {
                await interaction.reply(utilities.choose(this.state.quotes));
            } else {
                await interaction.reply("There are no quotes. You should add some");
            }
            return;
        }
        if (!this.state.quotes) {
            this.state.quotes = [];
        }

        if(interaction.options.getSubcommand() === 'new'){
            this.state.quotes.push(interaction.options.getString('quote'))
        }

        utilities.saveState('acmquotes', this.state);
    },
};