
import React, { useEffect, useState, useMemo } from "react";
import { fetchHistory } from "../api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsDashboard = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("7"); // default 7 days

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchHistory();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load analytics data", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refreshTrigger]);

  /* =========================
     FILTER BY DATE
  ========================= */
  const filteredHistory = useMemo(() => {
    const now = new Date();

    if (filter === "today") {
      return history.filter(h => {
        const date = new Date(h.createdAt);
        return date.toDateString() === now.toDateString();
      });
    }

    const days = parseInt(filter);
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - days);

    return history.filter(h => new Date(h.createdAt) >= pastDate);
  }, [history, filter]);

  /* =========================
     COMPUTE DISTRIBUTION
  ========================= */
  const safe = filteredHistory.filter(h => h.urlRiskScore < 40).length;
  const suspicious = filteredHistory.filter(
    h => h.urlRiskScore >= 40 && h.urlRiskScore < 70
  ).length;
  const high = filteredHistory.filter(h => h.urlRiskScore >= 70).length;

  const chartData = {
    labels: ["Safe", "Suspicious", "High Risk"],
    datasets: [
      {
        label: "Scan Distribution",
        data: [safe, suspicious, high],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderRadius: 8,
        barThickness: 50
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#ffffff" }
      }
    },
    scales: {
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="analytics-card">
      <div className="analytics-header">
        <h3>Threat Analytics Overview</h3>
      </div>

      {/* FILTER BUTTONS */}
      <div className="analytics-filters">
        <button
          className={filter === "today" ? "active-filter" : ""}
          onClick={() => setFilter("today")}
        >
          Today
        </button>

        <button
          className={filter === "7" ? "active-filter" : ""}
          onClick={() => setFilter("7")}
        >
          7 Days
        </button>

        <button
          className={filter === "30" ? "active-filter" : ""}
          onClick={() => setFilter("30")}
        >
          30 Days
        </button>
      </div>

      {loading ? (
        <div className="analytics-loading">Loading analytics...</div>
      ) : (
        <div style={{ height: "320px", marginTop: "20px" }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;