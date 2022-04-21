const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catbomb')
        .setDescription('Prints a random cat image.'),
    async execute(interaction) {
        axios.post("http://thecatapi.com/api/images/get",{} , {
            params: {
                "api_key": "MjIyNDAx",
                "format": "html"
            }
        })
        .then(async (res) => {
            await interaction.reply({ content: res.data.split('"')[5]})
        })
        .catch(error => {
            console.error(error);
        });
    },
};