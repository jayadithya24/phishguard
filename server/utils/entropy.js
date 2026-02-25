exports.calculateEntropy = (str) => {
  const map = {};

  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }

  let entropy = 0;
  const len = str.length;

  for (let key in map) {
    let p = map[key] / len;
    entropy -= p * Math.log2(p);
  }

  return entropy;
};