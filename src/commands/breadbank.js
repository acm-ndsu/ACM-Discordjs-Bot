const { SlashCommandBuilder } = require('@discordjs/builders')
const {choose} = require("../utilities");

module.exports = {
    lines: [
        "Welcome to the Bread bank. We sell bread, we sell loafs. We got bread on deck, bread on the floor. TOASTED, RO-",
        "Shut the f\*\*\* up. Listen, I just need a Baguette and a Brioche.",
        "We don't have either of those, you can get the gluten-free white bread or the potato bread-",
        "What the f\*\*\* is gluten?! Take that s\*\*\* out!",
        "It's gluten-free.",
        "I don't CARE if it's free.",
        "Swear on your f\*\*\*ing Y E E Z Y S, if you wanna fight, we gon' fight.",
        "You tryna' be on WORLDSTAR?",
        "What, you gonna record it?",
        "Ye, I got my dollar store camera ON.",
        "What's the f\*\*\*ing situætion?",
        "What the f\*\*\* do you want?",
        "I'm the mother f\*\*\*ing M A N A G E R",
        "At the bread store?",
        "B R E A D",
        "Tell him to take, the motherf\*\*\*in' gluten, OUT THE BREAD.",
        "I'ma need you to shut that bulls\*\*\* up chief. We can't take s\*\*\* out the bread.",
        "Why put it in the first place?! I know y'all smoking that Pack.",
        "We got crackers, no gluten.",
        "f\*\*\* crackers!!",
        "It's gluten free. Do you want the gluten or nah?",
        "Hell no. You Better take the gluten out that damn s\*\*\*",
        "Look, we've got whole wheat, gluten free, texas toast, gluten free, TORTILLA-",
        "f\*\*\* all that. What B\*\*\*\* A\*\* country are y'all from... where they got this Bulls\*\*\* at?!",
        "Florida.",
        "I knew it.",
        "Look, you can either take this YeasT, or i'm calling the police.",
        "I'm going W E A S T .",
        "Nah, don't call the police, I got a warrant...",
        "Honestly, f\*\*\* y'all! I ain't never seen nobody act like this over no bread",
        "What the f\*\*\* are you sayin'?!",
        "All I'm saying is f\*\*\* y'all's bread, f\*\*\* the gluten, and f\*\*\* them crackers.",
        "The crackers don’t have gluten-",
        "I'll take those.",
        "Okay that's gonna be 5-",
        "Nah, f\*\*\* that, I ain't payin'!",
    ],
    data: new SlashCommandBuilder()
        .setName('breadbank')
        .setDescription('Prints a random breadbank line.'),
    async execute(interaction) {
        await interaction.reply(choose(this.lines))
    }
};