function classify(text, score) {

    if (text.includes("otp") && score > 60)
        return { type: "OTP Fraud", level: "CRITICAL" };

    if (text.includes("job") && text.includes("fee"))
        return { type: "Job Scam", level: "HIGH" };

    if (score < 30)
        return { type: "Low Risk", level: "LOW" };

    return { type: "General Scam", level: "MEDIUM" };
}

module.exports = { classify };
