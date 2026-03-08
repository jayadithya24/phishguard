import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const getRiskColor = () => {
    if (result.status === "HIGH_RISK") return "bg-red-500";
    if (result.status === "SUSPICIOUS") return "bg-yellow-400";
    return "bg-green-500";
  };

  const getBadgeStyle = () => {
    if (result.status === "HIGH_RISK")
      return "bg-red-500 text-white";
    if (result.status === "SUSPICIOUS")
      return "bg-yellow-400 text-black";
    return "bg-green-500 text-white";
  };

  const formattedProbability =
    result.mlProbability !== undefined
      ? (result.mlProbability * 100).toFixed(2) + "%"
      : "N/A";

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 space-y-4">

      <h3 className="text-xl font-semibold text-white">
        🛡 Threat Analysis Report
      </h3>

      {/* STATUS BADGE */}
      <span
        className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${getBadgeStyle()}`}
      >
        {result.status.replace("_", " ")}
      </span>

      {/* RISK METER */}
      <div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${getRiskColor()} transition-all duration-700`}
            style={{ width: `${result.finalScore}%` }}
          />
        </div>

        <p className="text-sm text-slate-300 mt-1">
          Risk Score: {result.finalScore}/100
        </p>
      </div>

      <hr className="border-slate-700" />

      {/* DETAILS */}
      <div className="text-sm text-slate-300 space-y-1">
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