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
        if (amount > 0) {
            this.state.buzzkillLimit = amount;   
            utilities.saveState('karma-buzzkill', this.state);
            message = `Set karma buzzkill amount to ${amount}`
        } else {
            message = `Buzzkill amount not set; must be greater than 0`
        }

        interaction.reply({ 
            content: message, 
            ephemeral: true 
        });
    },
};