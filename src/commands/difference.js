const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const utilities = require('../utilities.js')

getRandomBool = () => {
    return Math.random() < .5
}

const delay = milliseconds => new Promise(res => setTimeout(res, milliseconds));

sendMessageAndWait = async (interaction, messageChoice1, messageChoice2, reply=false) => {
    if (reply) {
        if(getRandomBool()) {
            await interaction.reply(messageChoice1);
        } else {
            await interaction.reply(messageChoice2)
        }
    } else {
        if(getRandomBool()) {
            await interaction.followUp(messageChoice1);
        } else {
            await interaction.followUp(messageChoice2)
        }
    }

    await delay(2000);
}

module.exports = {
    messageChoices:
        [
            ['Ok, so', 'Well'],
            ['Um', 'Uh'],
            ['The first thing', 'The first is'],
            ['Ah', 'Hm'],
            ['Well its an object idea thing', 'Its an idea or object, thing'],
            ['That', 'That uh'],
            ['Exists', 'Does things'],
            ['Maybe', 'Maybe'],
            ['Where as the second', 'But the second'],
            ['Eh', 'Er'],
            ['May or may not do that too', 'Doesn\'t, or, does'],
            ['Or something like that', 'Or the complete opposite'],
            ['Maybe', 'Maybe']
        ],
    data: new SlashCommandBuilder()
        .setName('difference')
        .setDescription('Provides a high detailed difference between two things')
        .addStringOption(option =>
            option.setName('thing')
                .setDescription('First thing to compare')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('another-thing')
                .setDescription('Second thing to compare')
                .setRequired(true)),
    async execute(interaction) {
        compare1 = interaction.options.getString('thing');
        compare2 = interaction.options.getString('another-thing');

        interaction.reply(`> **${compare1} | ${compare2}**`)

        if (compare1 === 'anime' || compare2 === 'anime') {
            if (compare1 === 'trash' || compare2 === 'trash') 
                await interaction.channel.send('There is no difference');
            else
                await interaction.channel.send('Easy, one of these things is trash, and the other thing probably is too')
        } else if ((compare1 === "robbot" && compare2 === "human") || (compare1 === "human" && compare2 === "robbot")) {
            await interaction.channel.send('There is no difference');
        } else {
            good = false
            while (!good) {
                for (var i = 0; i < this.messageChoices.length; i++) {
                    await interaction.channel.send(utilities.choose(this.messageChoices[i]))
                    await delay(2000)
                }
                if (getRandomBool()) {
                    await interaction.channel.send('Wait');
                    await delay(2000);
                    if (getRandomBool()) {
                        await interaction.channel.send('Yeah I got that completely wrong, let me try again');
                    } else {
                        good = true;
                        await interaction.channel.send('No');
                        await delay(2000);
                        await interaction.channel.send('Yeah that\'s right');
                    }
                } else {
                    await interaction.channel.send('Yeah');
                    good = true;
                }
            }

            await delay(2000);
            await interaction.channel.send('Hope that helped');
        }
    },
};