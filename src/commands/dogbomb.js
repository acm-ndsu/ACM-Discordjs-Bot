const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dogbomb')
        .setDescription('Prints a random dog image.'),
    async execute(interaction) {
        axios.get("https://dog.ceo/api/breeds/image/random")
        .then(async (res) => {
            await interaction.reply({ content: res.data.message})
        })
        .catch(error => {
            console.error(error);
        });
    },
};