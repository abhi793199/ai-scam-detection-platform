const express = require("express");
const router = express.Router();

const { createReport, getReports } = require("../controllers/report.controller");

router.post("/", createReport);
router.get("/", getReports);

module.exports = router;
