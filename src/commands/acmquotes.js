const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('acmquotes'),
    data: new SlashCommandBuilder()
        .setName('acmquotes')
        .setDescription('acm quotes manager')
        .addSubcommand(subcommand =>
            subcommand.setName('new')
                .setDescription('Add new quote')
                .addStringOption(option =>
                    option.setName('quote')
                        .setDescription('quote to create')))
        .addSubcommand(subcommand =>
            subcommand.setName('print')
                .setDescription('prints a random ACM Quote'))
        .addSubcommand(subcommand =>
            subcommand.setName('list')
                .setDescription('lists all ACM Quotes')),
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

        if (interaction.options.getSubcommand() === 'list') {
            const hasQuotes = this.state.quotes;
            if (hasQuotes) {
                await interaction.reply(this.state.quotes.join('\n'));
            } else {
                await interaction.reply("There are no quotes. You should add some");
            }
            return;
        }

        if (!this.state.quotes) {
            this.state.quotes = [];
            utilities.saveState('acmquotes', this.state);
        }

        if(interaction.options.getSubcommand() === 'new'){
            const text = utilities.filterText(interaction.options.getString('quote'));
            if(!text){
                await interaction.reply(`Quote contains a banned substring!`);
            } else {
                this.state.quotes.push(text)
                await interaction.reply(`Quote: '${text}' has been added!`);
            }

        }

        utilities.saveState('acmquotes', this.state);
    },
};