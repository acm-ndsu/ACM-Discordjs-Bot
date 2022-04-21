const { SlashCommandBuilder } = require('@discordjs/builders')
const utilities = require('../utilities.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Offers a random compliment'),
    async execute(interaction) {
        noun = utilities.choose([
            "heart",
            "face",
            "breath",
            "aura",
            "hand",
            "cookie",
            "voice",
            "eye",
            "ear",
            "hair",
            "cooking",
            "clothing",
            "foot",
            "shoe"
        ])
        verb = utilities.choose([
            "smells",
            "looks",
            "feels",
            "tastes",
            "sounds",
        ])
        adj = utilities.choose([
            "like happiness",
            "like joy",
            "like heaven",
            "amazing",
            "like cookies",
            "like a spring breeze",
            "like a haiku",
            "good",
            "unique",
            "adventurous",
            "amiable",
            "exuberant",
            "creative",
            "dynamic",
            "exquisite",
            "tasty",
            "wonderful",
            "sweet",
            "like it exists",
            "satisfactory"
        ])

        phrase = "Your " + noun + " " + verb + " " + adj + "."

        await interaction.reply({ content: phrase })
    },
};