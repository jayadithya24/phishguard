import React, { useEffect, useState } from "react";
import { fetchHistory, deleteHistory } from "../api";

const HistoryTable = ({ refreshTrigger, user }) => {
  const [history, setHistory] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [copied, setCopied] = useState(false);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  const getBadge = (score) => {
    if (score >= 70) return "bg-red-500 text-white";
    if (score >= 40) return "bg-yellow-400 text-black";
    return "bg-green-500 text-white";
  };

  const getStatusLabel = (score) => {
    if (score >= 70) return "HIGH RISK";
    if (score >= 40) return "SUSPICIOUS";
    return "SAFE";
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleExport = () => {
    if (!history.length) return;

    const headers = ["URL", "Risk Score", "Status", "Date"];

    const rows = history.map((item) => [
      item.url,
      item.urlRiskScore,
      getStatusLabel(item.urlRiskScore),
      new Date(item.createdAt).toLocaleString()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "scan_history.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this scan?")) return;

    try {
      await deleteHistory(id);
      setSelectedScan(null);
      loadHistory();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-white">Scan History</h3>

          <button
            onClick={handleExport}
            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
          >
            Export CSV
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left text-slate-300">

            <thead className="border-b border-slate-700 text-slate-400 uppercase text-xs">
              <tr>
                <th className="py-3">URL</th>
                <th>Score</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {history.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    No scan history available
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => setSelectedScan(item)}
                    className="border-b border-slate-700 hover:bg-slate-700 cursor-pointer transition"
                  >
                    <td className="py-3 break-all">{item.url}</td>

                    <td>{item.urlRiskScore}%</td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadge(
                          item.urlRiskScore
                        )}`}
                      >
                        {getStatusLabel(item.urlRiskScore)}
                      </span>
                    </td>

                    <td>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* ===== DETAIL PANEL ===== */}
      {selectedScan && (

        <div
          className="fixed inset-0 bg-black/50 flex justify-end z-50"
          onClick={() => setSelectedScan(null)}
        >

          <div
            className="w-[420px] bg-slate-900 h-full p-6 shadow-xl border-l border-slate-700 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Scan Details</h3>

              <button
                className="text-slate-400 hover:text-white"
                onClick={() => setSelectedScan(null)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">

              <div className="flex items-center gap-2 flex-wrap">
                <strong>URL:</strong>
                <span className="break-all">{selectedScan.url}</span>

                <button
                  onClick={() => handleCopy(selectedScan.url)}
                  className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <p>
                <strong>Risk Score:</strong>{" "}
                {selectedScan.urlRiskScore}%
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getBadge(
                    selectedScan.urlRiskScore
                  )}`}
                >
                  {getStatusLabel(selectedScan.urlRiskScore)}
                </span>
              </p>

              <hr className="border-slate-700" />

              <p>
                <strong>Scan Date:</strong>{" "}
                {new Date(selectedScan.createdAt).toLocaleString()}
              </p>

              {selectedScan.reason && (
                <p>
                  <strong>AI Explanation:</strong>{" "}
                  {selectedScan.reason}
                </p>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(selectedScan._id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                >
                  Delete Scan
                </button>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default HistoryTable;