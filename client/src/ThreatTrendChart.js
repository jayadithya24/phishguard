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

const ThreatTrendChart = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };
    loadData();
  }, []);

  const sorted = [...history].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const labels = sorted.map(item =>
    new Date(item.createdAt).toLocaleTimeString()
  );

  const scores = sorted.map(item => item.urlRiskScore);

  const data = {
    labels,
    datasets: [
      {
        label: "Threat Score Over Time",
        data: scores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="result-card">
      <h3>Threat Trend Timeline</h3>
      <Line data={data} />
    </div>
  );
};

export default ThreatTrendChart;