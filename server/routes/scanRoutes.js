const express = require("express");
const router = express.Router();

const { scanURL } = require("../controllers/scanController");
const ScanReport = require("../models/ScanReport");
const { verifyToken } = require("../middleware/authMiddleware");

/* ================================
   🔍 SCAN URL
================================ */
router.post("/", verifyToken, scanURL);


/* ================================
   📜 GET SCAN HISTORY
   - Admin → all scans
   - User → only own scans
================================ */
router.get("/history", verifyToken, async (req, res) => {
  try {
    let scans;

    if (req.user.role === "admin") {
      scans = await ScanReport.find().sort({ createdAt: -1 });
    } else {
      scans = await ScanReport.find({ user: req.user.id })
        .sort({ createdAt: -1 });
    }

    res.json(scans);

  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});


/* ================================
   🗑 DELETE SCAN (ADMIN ONLY)
================================ */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // 🔐 Role Check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedScan = await ScanReport.findByIdAndDelete(req.params.id);

    if (!deletedScan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.json({ message: "Scan deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;