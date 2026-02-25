const mongoose = require("mongoose");

const ScanReportSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  urlRiskScore: {
    type: Number
  },
  user: {   // 🔥 NEW FIELD
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("ScanReport", ScanReportSchema);