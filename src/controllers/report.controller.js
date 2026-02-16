const engine = require('../engine/engine.core');
const reportService = require('../services/report.service');

// Helper function to generate verdict based on risk level
function getVerdict(riskLevel) {
    switch (riskLevel.toLowerCase()) {
        case 'high':
            return 'Do NOT trust / Highly suspicious!';
        case 'medium':
            return 'Be careful / Possibly risky';
        case 'low':
            return 'Seems safe';
        default:
            return 'Unknown';
    }
}

// Create a new report
async function createReport(req, res) {
    try {
        const { text, amount } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Text is required"
            });
        }

        // Analyze the text using your engine
        const result = await engine.analyze(text, amount || 0);

        // Save report to database
        const reportId = await reportService.saveReport({
            rawText: text,
            amount: amount || 0,
            finalScore: result.finalScore,
            classification: result.classification,
            keywordScore: result.keywordScore,
            patternScore: result.patternScore
        });

        // Send response including human-readable verdict
        res.status(200).json({
            id: reportId,
            risk_score: result.finalScore,
            risk_level: result.classification.level,
            verdict: getVerdict(result.classification.level),
            keyword_score: result.keywordScore,
            pattern_score: result.patternScore,
            amount: amount || 0
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

// Get all reports
async function getReports(req, res) {
    try {
        const reports = await reportService.getAllReports();

        // Add verdict for each report
        const reportsWithVerdict = reports.map(r => ({
            ...r,
            verdict: getVerdict(r.risk_level)
        }));

        res.json(reportsWithVerdict);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch reports"
        });
    }
}

module.exports = { createReport, getReports };
