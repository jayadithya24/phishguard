const { calculateEntropy } = require("../utils/entropy");

exports.analyzeURL = (url) => {
  let score = 0;

  if (!url) return 0;

  // Length check
  if (url.length > 30) score += 10;

  // HTTPS check
  if (!url.startsWith("https")) score += 20;

  // Suspicious characters
  if (url.includes("@")) score += 20;
  if (url.includes("-")) score += 10;

  // Entropy check
  const entropy = calculateEntropy(url);
  if (entropy > 4) score += 20;

  return score;
};