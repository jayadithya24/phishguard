const { analyzeURL } = require("../services/urlService");
const { calculateFinalRisk } = require("../services/riskService");
const ScanReport = require("../models/ScanReport");

exports.scanURL = async (req, res) => {
  try {
    const { url, text } = req.body;

    if (!url || !text) {
      return res.status(400).json({ error: "URL and text are required" });
    }

    /* ==========================================
       1️⃣ URL ANALYSIS (Rule-based score)
    ========================================== */
    const urlScore = analyzeURL(url);

    /* ==========================================
       2️⃣ MOCK AI ANALYSIS (TEMP FOR DEPLOYMENT)
    ========================================== */

    const suspiciousKeywords = [
      "login",
      "verify",
      "bank",
      "account",
      "secure",
      "update",
      "free",
      "password",
      "urgent",
      "confirm"
    ];

    let keywordScore = 0;

    suspiciousKeywords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        keywordScore += 1;
      }
    });

    // Convert keyword hits into probability (0 → 1 range)
    let mlProbability = Math.min(keywordScore * 0.15, 1);

    /* ==========================================
       3️⃣ COMBINE URL + AI SCORE
    ========================================== */

    const { finalScore, status } =
      calculateFinalRisk(urlScore, mlProbability);

    /* ==========================================
       4️⃣ SAVE TO DATABASE
    ========================================== */

    const newScan = new ScanReport({
      url,
      text,
      urlRiskScore: urlScore,
      finalRiskScore: finalScore,
      status,
      user: req.user.id
    });

    await newScan.save();

    /* ==========================================
       5️⃣ RESPONSE
    ========================================== */

    res.json({
      message: "AI Scan completed successfully",
      data: {
        url,
        text,
        urlScore,
        mlProbability,
        finalScore,
        status
      }
    });

  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ error: "Server error" });
  }
};