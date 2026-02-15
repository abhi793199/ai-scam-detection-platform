/**
 * AI Digital Scam Detection Engine
 * Rule-based weighted multi-layer scoring
 * Local-only, no external API
 */
// const engine = require("./engine.core");

const patterns = {
    urgent: /urgent|immediately|asap|otp|now/i,
    financial: /\$|money|transfer|account|bank/i,
    threat: /blocked|penalty|suspended|legal/i,
    phishingLinks: /(http|https):\/\/[^\s]+/i,
    personalInfo: /password|pin|ssn|dob|social security/i
};

// Scam type mapping (optional)
const scamTypes = [
    { id: 1, name: "Financial Fraud" },
    { id: 2, name: "Phishing" },
    { id: 3, name: "Threat / Extortion" }
];

/**
 * Analyze scam text
 * @param {string} text - message content
 * @param {number} amount - optional amount involved
 * @returns {object} result
 */
async function analyze(text, amount = 0) {
    let keywordScore = 0;
    let patternScore = 0;
    let behaviorScore = 0;
    let financialScore = 0;
    let contextualScore = 0;
    let multiplierValue = 1;

    // ---------------------
    // 1️⃣ Keyword detection
    // ---------------------
    for (let key in patterns) {
        const matches = text.match(patterns[key]);
        if (matches) {
            switch (key) {
                case "urgent":
                    keywordScore += matches.length * 30;
                    break;
                case "financial":
                    keywordScore += matches.length * 25;
                    financialScore += matches.length * 25;
                    break;
                case "threat":
                    keywordScore += matches.length * 35;
                    behaviorScore += matches.length * 30;
                    break;
                case "phishingLinks":
                    patternScore += 40;
                    break;
                case "personalInfo":
                    patternScore += 35;
                    break;
            }
        }
    }

    // ---------------------
    // 2️⃣ Amount-based multiplier
    // ---------------------
    if (amount > 1000) {
        multiplierValue += 0.5; // +50% risk for high amount
    } else if (amount > 500) {
        multiplierValue += 0.3; // +30%
    }

    // ---------------------
    // 3️⃣ Final weighted score
    // ---------------------
    let finalScore = Math.min(
        Math.round(
            (keywordScore * 0.4 +
                patternScore * 0.3 +
                behaviorScore * 0.2 +
                financialScore * 0.1) *
                multiplierValue
        ),
        100
    );

    // ---------------------
    // 4️⃣ Classification
    // ---------------------
    let level = "Low";
    if (finalScore >= 40) level = "High";
    else if (finalScore >= 20) level = "Medium";

    // ---------------------
    // 5️⃣ Scam type detection
    // ---------------------
    let scamTypeId = 1; // default
    if (text.match(patterns.financial)) scamTypeId = 1;
    else if (text.match(patterns.phishingLinks)) scamTypeId = 2;
    else if (text.match(patterns.threat)) scamTypeId = 3;

    // ---------------------
    // 6️⃣ FIR generator (simple)
    // ---------------------
    const fir = `
FIR REPORT

Complaint:
${text}

Amount Involved: ${amount || "N/A"}
Risk Level: ${level}
Risk Score: ${finalScore}
Scam Type: ${scamTypes.find(s => s.id === scamTypeId).name}

System Generated AI Assessment.
`;

    // ---------------------
    // 7️⃣ Return structured object
    // ---------------------
    return {
        finalScore,
        classification: { level },
        keywordScore,
        patternScore,
        behaviorScore,
        financialScore,
        contextualScore,
        multiplierValue,
        scamTypeId,
        fir
    };
}

    // async function test() {
    //     const result = await engine.analyze(
    //         "URGENT! Send $5000 immediately to your bank account or your account will be blocked.",
    //         5000
    //     );
    //     console.log(result);
    // }

    // test();

module.exports = { analyze };
