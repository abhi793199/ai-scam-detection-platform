function calculateBaseScore(scores) {

    const {
        keywordScore = 0,
        patternScore = 0
    } = scores;

    return (
        keywordScore * 0.4 +
        patternScore * 0.6
    );
}

function applyMultipliers(baseScore, amount) {

    let multiplier = 1;

    if (amount > 50000) multiplier += 0.5;
    if (baseScore > 60) multiplier += 0.2;

    let finalScore = baseScore * multiplier;

    if (finalScore > 100) finalScore = 100;

    return Math.round(finalScore);
}

module.exports = {
    calculateBaseScore,
    applyMultipliers
};
