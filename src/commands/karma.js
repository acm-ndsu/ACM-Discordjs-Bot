const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    state:
        utilities.loadState('karma'),
    addUserKarma(user, amount) {
        if (!this.state.karma) {
            this.state.karma = {};
        }

        if (!this.state.karma[user.id]) {
            this.state.karma[user.id] = 0;
        }
        this.state.karma[user.id] += amount;

        utilities.saveState('karma', this.state);

        return `${user}: karma is now ${this.state.karma[user.id]}`
    },
    data: new SlashCommandBuilder()
        .setName('karma')
        .setDescription('Bestow the given amount of ++/-- from person.')
        .addSubcommand(subcommand =>
            subcommand.setName('target')
                .setDescription('Gives karma to target')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('target to give karma')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('amount')
                        .setDescription("Amount of karma to give in ++/-- format")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('check')
                .setDescription('Show how much karma the user has')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('User to check karma of, defaults to yourself'))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'check') {
            user = interaction.options.getUser('user') ?? interaction.user;
            amount = this.state.karma ? this.state.karma[user.id] ?? 0 : 0;
            await interaction.reply(`${user}: karma is at ${amount}`)
            return;
        }

        amountStr = interaction.options.getString('amount');
        msg = null;
        if (amountStr && amountStr.match(/\s*(\+\++|--+)$/)) {
            amount = amountStr.length - 1;
            if (amountStr[0] === '-')
                amount *= -1;
            
            if(amount) {
                targetUser = interaction.options.getUser('target');
                buzzkillLimit = utilities.loadState('karma-buzzkill').buzzkillLimit ?? 5
                if (interaction.user == targetUser) {
                    msg = "You cannot set karma on yourself!";
                } else if (Math.abs(amount) > buzzkillLimit && buzzkillLimit > 0) {
                    msg = `Buzzkill mode enabled; karma change greater than ${buzzkillLimit} not allowed`
                } else {
                    msg = this.addUserKarma(targetUser, amount);
                }
                await interaction.reply(msg)
            }
        } else {
            await interaction.reply("Amount 0 or invalid formatting")
        }
    },
};