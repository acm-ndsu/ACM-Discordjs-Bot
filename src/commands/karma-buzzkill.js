const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('karma-buzzkill'),
    data: new SlashCommandBuilder()
        .setName('karma-buzzkill')
        .setDescription('Sets the buzzkill limit for the karma command.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Max karma change allowed')
                .setRequired(true)),
    permissions: [{
        id: '966912680420065301',
        type: 'ROLE',
        permission: true
    }],
    async execute(interaction) {
        amount = interaction.options.getInteger('amount');
        this.state.buzzkillLimit = amount;        

        utilities.saveState('karma-buzzkill', this.state);
        interaction.reply({ 
            content: `Set karma buzzkill amount to ${amount}`, 
            ephemeral: true 
        });
    },
};