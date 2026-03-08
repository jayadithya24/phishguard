import React, { useEffect, useState } from "react";
import { fetchHistory } from "../api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ThreatTrendChart = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHistory();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load trend data", err);
      }
    };

    loadData();
  }, [refreshTrigger]);

  const sorted = [...history].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const labels = sorted.map((item) =>
    new Date(item.createdAt).toLocaleTimeString()
  );

  const scores = sorted.map((item) => item.urlRiskScore);

  const data = {
    labels,
    datasets: [
      {
        label: "Threat Score Over Time",
        data: scores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h3 className="text-lg font-semibold text-white mb-4">
        📈 Threat Trend Timeline
      </h3>

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>

    </div>
  );
};

export default ThreatTrendChart;