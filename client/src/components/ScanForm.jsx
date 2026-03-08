import React, { useState } from "react";
import { scanURL } from "../api";

const ScanForm = ({ setResult }) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    } catch (err) {
      console.error("Scan failed:", err);
      setError("❌ Scan failed. Please check backend or login again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-10 shadow-xl">

    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        type="text"
        placeholder="🔗 Enter suspicious URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
      />

      <textarea
        placeholder="📝 Enter suspicious message text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none h-36"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-cyan-500 to-blue-600
        hover:from-cyan-400 hover:to-blue-500 transition"
      >
        {loading ? "Scanning..." : "🚀 Scan Now"}
      </button>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

    </form>

  </div>
);
};

export default ScanForm;