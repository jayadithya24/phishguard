import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const getRiskColor = () => {
    if (result.status === "HIGH_RISK") return "#ef4444";      // Red
    if (result.status === "SUSPICIOUS") return "#facc15";     // Yellow
    return "#22c55e";                                         // Green
  };

  const getBadgeClass = () => {
    if (result.status === "HIGH_RISK") return "badge high";
    if (result.status === "SUSPICIOUS") return "badge suspicious";
    return "badge safe";
  };

  const formattedProbability =
    result.mlProbability !== undefined
      ? (result.mlProbability * 100).toFixed(2) + "%"
      : "N/A";

  const riskColor = getRiskColor();

  return (
    <div className="result-card">
      <h3>🛡 Threat Analysis Report</h3>

      {/* Status Badge */}
      <div className="status-container">
        <span className={getBadgeClass()}>
          {result.status.replace("_", " ")}
        </span>
      </div>

      {/* Animated Risk Meter */}
      <div className="risk-meter-wrapper">
        <div className="risk-meter-bg">
          <div
            className="risk-meter-fill"
            style={{
              width: `${result.finalScore}%`,
              background: riskColor,
              boxShadow: `0 0 10px ${riskColor}`
            }}
          />
        </div>
        <div className="risk-score-text">
          {result.finalScore}/100
        </div>
      </div>

      <hr />

      {/* Detailed Scores */}
      <div className="risk-details">
        <p>
          <strong>URL Risk Score:</strong> {result.urlScore}
        </p>
        <p>
          <strong>ML Detection Probability:</strong> {formattedProbability}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;