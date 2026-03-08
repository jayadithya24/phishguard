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
  const [filter, setFilter] = useState("7");

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

  /* FILTER HISTORY */
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

  /* DISTRIBUTION */
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
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      {/* HEADER */}
      <h3 className="text-lg font-semibold text-white mb-4">
        Threat Analytics Overview
      </h3>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={() => setFilter("today")}
          className={`px-4 py-1 rounded text-sm transition
          ${
            filter === "today"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Today
        </button>

        <button
          onClick={() => setFilter("7")}
          className={`px-4 py-1 rounded text-sm transition
          ${
            filter === "7"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          7 Days
        </button>

        <button
          onClick={() => setFilter("30")}
          className={`px-4 py-1 rounded text-sm transition
          ${
            filter === "30"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          30 Days
        </button>

      </div>

      {/* CHART */}
      {loading ? (
        <div className="text-slate-400 text-sm">
          Loading analytics...
        </div>
      ) : (
        <div className="h-[320px]">
          <Bar data={chartData} options={options} />
        </div>
      )}

    </div>
  );
};

export default AnalyticsDashboard;