import React, { useState } from "react";
import { scanURL } from "../api";

const ScanForm = ({ setResult }) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!url.trim() || !text.trim()) {
      setError("⚠ Please enter both URL and message text.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await scanURL({ url, text });

      if (response && response.data) {
        setResult(response.data);
      } else {
        setResult(response);
      }

      // Optional: Clear fields after scan
      // setUrl("");
      // setText("");

    } catch (err) {
      console.error("Scan failed:", err);
      setError("❌ Scan failed. Please check backend or login again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="scan-form">
      <input
        type="text"
        placeholder="🔗 Enter suspicious URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
        className="scan-input"
      />

      <textarea
        placeholder="📝 Enter suspicious message text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        className="scan-textarea"
      />

      <button type="submit" disabled={loading}>
  {loading ? "🔍 Scanning..." : "🚀 Scan Now"}
</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default ScanForm;