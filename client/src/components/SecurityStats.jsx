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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* TOTAL */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border border-slate-700">
        <h3 className="text-slate-400 text-sm mb-2">Total Scans</h3>
        <p className="text-3xl font-bold text-white">
          <CountUp end={stats.total} duration={0.8} />
        </p>
      </div>

      {/* SAFE */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
        <h3 className="text-green-400 text-sm mb-2">Safe</h3>
        <p className="text-3xl font-bold text-green-400">
          <CountUp end={stats.safe} duration={0.8} />
        </p>
      </div>

      {/* SUSPICIOUS */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-400">
        <h3 className="text-yellow-400 text-sm mb-2">Suspicious</h3>
        <p className="text-3xl font-bold text-yellow-400">
          <CountUp end={stats.suspicious} duration={0.8} />
        </p>
      </div>

      {/* HIGH RISK */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border-l-4 border-red-500">
        <h3 className="text-red-400 text-sm mb-2">High Risk</h3>
        <p className="text-3xl font-bold text-red-400">
          <CountUp end={stats.high} duration={0.8} />
        </p>
      </div>

    </div>
  );
};

export default SecurityStats;