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
                .setDescription('text for second panel'))
        .addStringOption(
            option => option.setName('text3')
                .setDescription('text for third panel'))
        .addStringOption(
            option => option.setName('text4')
                .setDescription('text for forth panel'))
        .addStringOption(
            option => option.setName('text5')
                .setDescription('text for fifth panel')),
    async execute(interaction) {
        boxes = {"boxes[0][text]": interaction.options.getString('top'),
            "boxes[1][text]": interaction.options.getString('bottom') ?? "",
            "boxes[2][text]": interaction.options.getString('text3') ?? "",
            "boxes[3][text]": interaction.options.getString('text4') ?? "",
            "boxes[4][text]": interaction.options.getString('text5') ?? ""}
        temp_boxes = Object.entries(boxes).filter(([_,v]) => v !== "")
        boxes = Object.fromEntries(temp_boxes)
        memes = await getMemeIds();
        memes = await memes.filter(x => x.box_count === Math.max(temp_boxes.length, 2));
        memeId = utilities.choose(memes).id
        axios.post("https://api.imgflip.com/caption_image",{} , {
            params: {
                "template_id": memeId,
                "username": "waakis",
                "password": "123abc",
                ...boxes
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