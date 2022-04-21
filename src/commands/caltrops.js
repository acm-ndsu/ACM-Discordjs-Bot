const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const utilities = require('../utilities.js');

getJsonFromFile = (filePath) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath)))
}

formatAndSend = async (interaction, link, desc) => {
    console.log(link)
    send = `${desc} | ${link}`;
    await interaction.reply({ content: send });
}

module.exports = {
    cat:
        getJsonFromFile('../../caltropsContent/cat.json'),
    computers:
        getJsonFromFile('../../caltropsContent/computers.json'),
    myth:
        getJsonFromFile('../../caltropsContent/myth.json'),
    problem:
        getJsonFromFile('../../caltropsContent/problem.json'),
    unusual:
        getJsonFromFile('../../caltropsContent/unusual.json'),
    data: new SlashCommandBuilder()
        .setName('caltrops')
        .setDescription('Returns an interesting wiki article to distract you')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('<category | either none, computer, problem, unusual, myth, cat or random >')),
    async execute(interaction) {
        switch(interaction.options.getString('category')) {
            case 'computer':
                entry = utilities.choose(Object.entries(this.computers));
                link = entry[0]
                desc = entry[1]
                break;
            case 'problem':
                entry = utilities.choose(Object.entries(this.problem));
                link = entry[0]
                desc = entry[1]
                break;
            case 'myth':
                entry = utilities.choose(Object.entries(this.myth));
                link = entry[0]
                desc = entry[1]
                break;
            case 'cat':
                entry = utilities.choose(Object.entries(this.cat));
                link = entry[0]
                desc = entry[1]
                break;
            case 'random':
                res = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary")
                link = res.data.content_urls.desktop.page;
                desc = res.data.extract.substring(0, 250)
                break;
            default:
                entry = utilities.choose(Object.entries(this.unusual));
                link = entry[0]
                desc = entry[1]
        }
        await formatAndSend(interaction, link, desc);
    },
};