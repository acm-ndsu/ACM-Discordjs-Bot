const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a Y-sided die X times')
        .addStringOption(option =>
            option.setName('xdy')
                .setDescription('Roll an X-sided die Y-times')
                .setRequired(true)),
    async execute(interaction) {
        sides = 6
        count = 1
        msg = ""
        try {
            parts = interaction.options.getString('xdy').split('d');
            count = parseInt(parts[0]);
            sides = parseInt(parts[1]);
        } catch (error) {
            msg += "Not in XdY format, assuming 1d6\n";
        }
        if (sides > 100) {
            msg = "Sides > 100 not supported.";
        } else if (sides < 2) {
            msg = "You rolled a one sided die. You look into truth itself.";
        } else if (count > 100) {
            msg = "More than 100 dice per roll not supported. Are you running Shadowrun or something?";
        } else if (count < 1) {
            msg = `Okay I will roll ${count} dice. That is less than 1. You fail the roll. Rocks fall, everyone dies. The end.`;
        } else {
            rolls = "";
            total = 0;
            for(let i = 0; i < count; i++) {
                r = Math.floor(Math.random() * sides) + 1;
                rolls += r + ', ';
                total += r;
            }
            msg += `${interaction.user} rolled ${count}d${sides}...\n${rolls}\nTotal: ${total}`;
        }
        await interaction.reply(msg);
    },
};