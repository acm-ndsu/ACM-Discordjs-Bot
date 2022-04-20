const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Life advice several keystrokes away!')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The question you ask.')
                .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');

        responses = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful",
        ]

        choice = Math.floor(Math.random() * 19)

        await interaction.reply(responses[choice])
    },
};