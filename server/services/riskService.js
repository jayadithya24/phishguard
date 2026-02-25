exports.calculateFinalRisk = (urlScore, mlProbability) => {
  const mlScore = mlProbability * 100;

  // Weighted scoring
  const finalScore = (0.6 * urlScore) + (0.4 * mlScore);

  let status = "SAFE";

  if (finalScore >= 70) {
    status = "HIGH_RISK";
  } else if (finalScore >= 40) {
    status = "SUSPICIOUS";
  }

  return { finalScore: Math.round(finalScore), status };
};