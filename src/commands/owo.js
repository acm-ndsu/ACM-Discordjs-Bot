const { SlashCommandBuilder } = require('@discordjs/builders');
const utilities = require('../utilities.js');

module.exports = {
    adjective:
    [
        "",
        "",
        "",
        "bold ",
        "brutally honest ",
        "controversial ",
        "honest ",
        "humble ",
        "insightful ",
        "off-color ",
        "off-the-record ",
        "perceptive ",
        "true ",
        "undebatable "
    ],
    openingRemarks:
    [
        "",
        "I believe ",
        "I think ",
        "I would say "

    ],
    languageOptions:
    [
        "Ada",
        "ALGOL 68",
        "Basic",
        "C",
        "C#",
        "C++",
        "COBOL",
        "CSS",
        "F#",
        "Fortran",
        "Go",
        "Haskell",
        "HTML",
        "Java",
        "Javascript",
        "Kotlin",
        "LambdaMOO",
        "Lisp",
        "Matlab",
        "Objective-C",
        "Pascal",
        "Perl",
        "PHP",
        "Prolog",
        "Python",
        "R",
        "Ruby",
        "Rust",
        "Scratch",
        "Shakespeare",
        "Shell",
        "SQL",
        "Swift",
        "Typescript",
        "Visual Basic"
    ],
    opinions:
    [
        "could use some more work.",
        "is a gift to mankind!",
        "is a good language.",
        "is a great language.",
        "is actually pretty good.",
        "is decent.",
        "is my favorite programming language.",
        "is the worst language created.",
        "is wonderful!",
        "has more cons than pros.",
        "has more pros than cons.",
        "needs improvements.",
        "should be banned from GitHub.",
        "shouldn't be considered a language."
    ],
    closingRemarks:
    [
        "",
        "",
        "",
        "Any arguments?",
        "But hey, that's just my opinion. A robbot opinion.",
        "But that's what everybody says.",
        "Do you agree?",
        "I hope you would say the same!",
        "I know it's not that popular of an opinion.",
        "I know others tend to agree.",
        "I think.",
        "Maybe I'm wrong.",
        "Thoughts?",
        "What do you think?"
    ],
    data: new SlashCommandBuilder()
        .setName('opinion')
        .setDescription('Randomly generates an opinion about a programming language.')
        .addStringOption(option => 
            option.setName('language')
                .setDescription('Language to get an opinion of')),
    async execute(interaction) {
        language = interaction.options.getString('language');
        if (!language) {
            language = utilities.choose(this.languageOptions);
        }
        adjective = utilities.choose(this.adjective);
        openingRemark = utilities.choose(this.openingRemarks);
        opinion = utilities.choose(this.opinions);
        closingRemark = utilities.choose(this.closingRemarks);

        myOpinion = `In my ${adjective} opinion ${openingRemark}${language} ${opinion} ${closingRemark}`

        await interaction.reply({ content: myOpinion });
    },
};