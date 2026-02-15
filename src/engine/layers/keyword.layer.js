const keywords = [
    { word: "urgent", weight: 10 },
    { word: "verify", weight: 8 },
    { word: "otp", weight: 15 },
    { word: "click now", weight: 12 }
];

function analyze(text) {
    let score = 0;

    keywords.forEach(k => {
        if (text.toLowerCase().includes(k.word)) {
            score += k.weight;
        }
    });

    return score;
}

module.exports = { analyze };
