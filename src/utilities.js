const path = require('path');
const fs = require('fs');

module.exports = {
    choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
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