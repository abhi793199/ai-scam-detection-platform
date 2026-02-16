const engine = require('../engine/engine.core');
const reportService = require('../services/report.service');

async function createReport(req, res) {

    try {
        const { text, amount } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Text is required"
            });
        }

        const result = await engine.analyze(text, amount || 0);

        const reportId = await reportService.saveReport({
            rawText: text,
            amount: amount || 0,
            finalScore: result.finalScore,
            classification: result.classification,
            keywordScore: result.keywordScore,
            patternScore: result.patternScore
        });

        res.status(200).json({
    id: reportId,
    risk_score: result.finalScore,
    risk_level: result.classification.level,
    verdict: result.classification.level,

    keyword_score: result.keywordScore,
    pattern_score: result.patternScore
});


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}


async function getReports(req, res) {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch reports"
    });
  }
}




module.exports = { createReport, getReports };
