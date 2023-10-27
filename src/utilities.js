const path = require('path');
const fs = require('fs');

module.exports = {
    choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    },

    filterText(text) {
        const censorlist = [
            "shit",
            "cunt",
            "fuck",
            "damn",
            "penis",
            "cock",
            "peen",
            "schlong",
            " ass",
            "dick",
            "cum",
            "bitch",

        ];
        const banlist = [
            "nigger",
            "nigga",
            "faggot",
            "fag",
            "tranny",
            "whore",
            "hooker",
            "black face",
            "zipperhead",
            "chink",
            "ching chong",
            "retard",
            "gook",
            "coon",
            "jigaboo",
            "porch monkey",
            "border hopper",
            "sped",
            "beaner",
            "kike",
            "dyke",
            "slut",
            "basketball people",
            "disappear at night time people",
            "hohol",
            "alligator bait",
            "christ-killer",
            "cholo",
            "gringo",
            "gypsy",
            "jive-speaker",
            "honky",
            "cracker",
            "jewboy",
            "yid",
            "wop",
            "wigger",
            "wagon burner",
            "tar baby",
            "she male",
            "she-male",
            "shemale",
            "mud people",
            "blackie",
            "jungle fucker",
            "goat fucker",
            "spear chucker",
            "towel head",
            "rag head",
            "pajeet",
            "oven dodger",
            "niglet",
            "negro",
            "nig nog",
            "fudge packer",
            "gender bender",
            "greaseball",
            "street cheetah",
            "moon cricket",
            "swamp donkey",
            "dog eater",
            "dog-eater",
            "dogeater",
            "mayonnaise face",
            "shitskin",
            "porki",
        ];

        const isBanned = banlist.any(word => text.toLowerCase().contains(word));

        if(isBanned){
            return false;
        }

        const asterisk = "\\*"

        let toAsterisked = (x) => x[0]+x.substring(1).replaceAll(".", asterisk)

        return censorlist.map(word => text = text.replaceAll(new RegExp(word, i), toAsterisked(word)))[-1]

    },

    getCleanJsonFilePath(moduleName) {
        cleanModuleName = moduleName.replace(/\W+/, '');
        jsonFileName = cleanModuleName + '.json';
        return path.resolve(__dirname, `../persistence/${jsonFileName}`)
    },

    loadState(moduleName) {
        try {
            jsonString = fs.readFileSync(this.getCleanJsonFilePath(moduleName));
            return JSON.parse(jsonString);
        } catch (error) {
            return {};
        }
    },

    saveState(moduleName, state) {
        jsonString = JSON.stringify(state);
        filePath = this.getCleanJsonFilePath(moduleName);
        fs.writeFile(filePath, jsonString, err => {
            if (err) {
                console.log('Error writing state to: ', err);
            } else {
                console.log('Successfully wrote state to: ', filePath);
            }
        });
    }
}