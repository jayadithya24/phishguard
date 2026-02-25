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
    if (score >= 70) return "badge high";
    if (score >= 40) return "badge suspicious";
    return "badge safe";
  };

  const getStatusLabel = (score) => {
    if (score >= 70) return "HIGH RISK";
    if (score >= 40) return "SUSPICIOUS";
    return "SAFE";
  };

  /* =========================
     COPY FUNCTION
  ========================= */
  const handleCopy = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  /* =========================
     EXPORT CSV
  ========================= */
  const handleExport = () => {
    if (!history.length) return;

    const headers = ["URL", "Risk Score", "Status", "Date"];

    const rows = history.map((item) => [
      item.url,
      item.urlRiskScore,
      item.urlRiskScore >= 70
        ? "HIGH RISK"
        : item.urlRiskScore >= 40
        ? "SUSPICIOUS"
        : "SAFE",
      new Date(item.createdAt).toLocaleString()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scan_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================
     DELETE (ADMIN ONLY)
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scan?"
    );
    if (!confirmDelete) return;

    try {
      await deleteHistory(id);
      setSelectedScan(null);
      loadHistory();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="result-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Scan History</h3>
          <button className="export-btn" onClick={handleExport}>
            Export CSV
          </button>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Score</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No scan history available.
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr
                  key={item._id}
                  className="clickable-row"
                  onClick={() => setSelectedScan(item)}
                >
                  <td>{item.url}</td>
                  <td>{item.urlRiskScore}%</td>
                  <td>
                    <span className={getBadge(item.urlRiskScore)}>
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

      {/* ===== DETAIL PANEL ===== */}
      {selectedScan && (
        <div
          className="scan-detail-overlay"
          onClick={() => setSelectedScan(null)}
        >
          <div
            className="scan-detail-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-header">
              <h3>Scan Details</h3>
              <button onClick={() => setSelectedScan(null)}>✕</button>
            </div>

            <div className="panel-content">
              <div className="url-copy-row">
                <strong>URL:</strong>
                <span className="url-text">{selectedScan.url}</span>
                <button
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => handleCopy(selectedScan.url)}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <p><strong>Risk Score:</strong> {selectedScan.urlRiskScore}%</p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={getBadge(selectedScan.urlRiskScore)}>
                  {getStatusLabel(selectedScan.urlRiskScore)}
                </span>
              </p>

              <hr style={{ margin: "20px 0", opacity: 0.2 }} />

              <h4>Analysis Metadata</h4>

              <p>
                <strong>Scan Date:</strong>{" "}
                {new Date(selectedScan.createdAt).toLocaleString()}
              </p>

              {selectedScan.reason && (
                <p>
                  <strong>AI Explanation:</strong> {selectedScan.reason}
                </p>
              )}

              {/* 🔥 ADMIN DELETE BUTTON */}
              {user?.role === "admin" && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(selectedScan._id)}
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