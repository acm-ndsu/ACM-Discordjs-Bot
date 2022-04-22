const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    buzzkillLimit:
        5,
    state:
        utilities.loadState('karma'),
    addUserKarma() {
        
    },
    data: new SlashCommandBuilder()
        .setName('karma')
        .setDescription('Bestow the given amount of ++/-- from person.')
        .addSubcommand(subcommand =>
            subcommand.setName('target')
                .setDescription('Gives karma to target')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('target to give karma'))
                .addStringOption(option =>
                    option.setName('amount')
                        .setDescription("Amount of karma to give in ++/-- format")))
        .addSubcommand(subcommand =>
            subcommand.setName('check')
                .setDescription('Show how much karma the user has')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('User to check karma of'))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'check') {
            hasCounts = this.state.counts && this.state.counts[interaction.user.id];
            if (hasCounts) {
                await interaction.reply(`${interaction.user} has been hugged ${this.state.counts[interaction.user.id]} times`);
            } else {
                await interaction.reply('No hugs for you. So far...');
            }
            return;
        }
        amountStr = interaction.options.getString('amount');
        if (amountStr.match(/\s*(\+\++|--+)$/)) {
            amount = amountStr.length - 1;
            if (amountStr[0] === '-')
                amount *= -1;
            
            if(amount) {
                if (interaction.user == interaction.options.getUser('target')) {
                    msg = "You cannot set karma on yourself!";
                } else if (Math.abs(amount) > this.buzzkillLimit && this.buzzkillLimit > 0) {
                    msg = `Buzzkill mode enabled; karma change greater than ${this.buzzkillLimit} not allowed`
                } else {
                    msg = 
                }
            }
        }
    },
};