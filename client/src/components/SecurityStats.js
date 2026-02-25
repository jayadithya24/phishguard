import React, { useEffect, useState } from "react";
import { fetchHistory } from "../api";
import CountUp from "react-countup";

const SecurityStats = ({ refreshTrigger }) => {
  const [stats, setStats] = useState({
    total: 0,
    safe: 0,
    suspicious: 0,
    high: 0
  });

  const loadStats = async () => {
    const data = await fetchHistory();

    const total = data.length;
    const safe = data.filter(item => item.urlRiskScore < 40).length;
    const suspicious = data.filter(item => item.urlRiskScore >= 40 && item.urlRiskScore < 70).length;
    const high = data.filter(item => item.urlRiskScore >= 70).length;

    setStats({ total, safe, suspicious, high });
  };

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Scans</h3>
        <p><CountUp end={stats.total} duration={0.8} /></p>
      </div>

      <div className="stat-card safe">
        <h3>Safe</h3>
        <p><CountUp end={stats.safe} duration={0.8} /></p>
      </div>

      <div className="stat-card suspicious">
        <h3>Suspicious</h3>
        <p><CountUp end={stats.suspicious} duration={0.8} /></p>
      </div>

      <div className="stat-card high">
        <h3>High Risk</h3>
        <p><CountUp end={stats.high} duration={0.8} /></p>
      </div>

    </div>
  );
};

export default SecurityStats;