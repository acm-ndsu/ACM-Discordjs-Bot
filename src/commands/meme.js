const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const utilities = require('../utilities.js');

getMemeIds = async () => {
    res = await axios.get("https://api.imgflip.com/get_memes");
    return res.data.data.memes;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Generates a random meme using imgflip api')
        .addStringOption(
            option => option.setName('top')
                .setDescription('text for one panel')
                .setRequired(true))
        .addStringOption(
            option => option.setName('bottom')
                .setDescription('text for second panel')),
    async execute(interaction) {
        memeId = utilities.choose(await getMemeIds()).id;
        axios.post("https://api.imgflip.com/caption_image",{} , {
            params: {
                "template_id": memeId,
                "username": "waakis",
                "password": "123abc",
                "text0": interaction.options.getString('top'),
                "text1": interaction.options.getString('bottom') ?? ""
            }
        })
        .then(async (res) => {
            await interaction.reply({ content: res.data.data.url});
        })
        .catch(error => {
            console.error(error);
        });
    },
};