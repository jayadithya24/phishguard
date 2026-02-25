const { analyzeURL } = require("../services/urlService");
const { calculateFinalRisk } = require("../services/riskService");
const ScanReport = require("../models/ScanReport");

exports.scanURL = async (req, res) => {
  try {
    const { url, text } = req.body;

    if (!url || !text) {
      return res.status(400).json({ error: "URL and text are required" });
    }

    // 1️⃣ URL Analysis (Rule-based)
    const urlScore = analyzeURL(url);

    // 2️⃣ Call ML Service
    const mlResponse = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!mlResponse.ok) {
      throw new Error("ML service error");
    }

    const mlData = await mlResponse.json();

    // Adjust this depending on your ML response structure
    const mlProbability = mlData.phishingProbability || 0;

    // 3️⃣ Combine Scores
    const { finalScore, status } =
      calculateFinalRisk(urlScore, mlProbability);

    // 4️⃣ Save to MongoDB (FIXED)
    const newScan = new ScanReport({
      url,
      text,
      urlRiskScore: urlScore,   // 🔥 FIXED
      user: req.user.id
    });

    await newScan.save();

    // 5️⃣ Send Response
    res.json({
      message: "AI Scan completed",
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