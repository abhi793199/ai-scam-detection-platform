const pool = require('../config/db.config');
// const db = require("../config/db.config");

async function saveReport(data) {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const {
            rawText,
            amount,
            finalScore,
            classification,
            keywordScore,
            patternScore
        } = data;

        // 1️⃣ Insert into reports table
        const [reportResult] = await connection.execute(
            `INSERT INTO reports 
            (raw_text, amount, risk_score, risk_level, scam_type_id, confidence)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                rawText,
                amount,
                finalScore,
                classification.level,
                1,                // Temporary scam_type_id
                90                // Temporary confidence
            ]
        );

        const reportId = reportResult.insertId;

        // 2️⃣ Insert into layer_scores
        await connection.execute(
            `INSERT INTO layer_scores
            (report_id, keyword_score, pattern_score, behavior_score, financial_score, contextual_score, multiplier_value)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                reportId,
                keywordScore,
                patternScore,
                0,
                0,
                0,
                1
            ]
        );

        await connection.commit();

        return reportId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getAllReports() {
  const [rows] = await pool.query(
    "SELECT * FROM reports ORDER BY created_at DESC"
  );
  return rows;
}

module.exports = { saveReport,getAllReports };
