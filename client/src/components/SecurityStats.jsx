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
      <div className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-slate-900 to-sky-950/40 p-6 text-center shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-sky-200">Total Scans</h3>
        <p className="text-3xl font-extrabold text-sky-100">
          <CountUp end={stats.total} duration={0.8} />
        </p>
      </div>

      {/* SAFE */}
      <div className="rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-slate-900 to-emerald-950/40 p-6 text-center shadow-[0_10px_30px_rgba(16,185,129,0.15)]">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-emerald-200">Safe</h3>
        <p className="text-3xl font-extrabold text-emerald-300">
          <CountUp end={stats.safe} duration={0.8} />
        </p>
      </div>

      {/* SUSPICIOUS */}
      <div className="rounded-2xl border border-amber-300/40 bg-gradient-to-br from-slate-900 to-amber-950/40 p-6 text-center shadow-[0_10px_30px_rgba(245,158,11,0.13)]">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-amber-200">Suspicious</h3>
        <p className="text-3xl font-extrabold text-amber-300">
          <CountUp end={stats.suspicious} duration={0.8} />
        </p>
      </div>

      {/* HIGH RISK */}
      <div className="rounded-2xl border border-rose-400/35 bg-gradient-to-br from-slate-900 to-rose-950/40 p-6 text-center shadow-[0_10px_30px_rgba(244,63,94,0.14)]">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-rose-200">High Risk</h3>
        <p className="text-3xl font-extrabold text-rose-300">
          <CountUp end={stats.high} duration={0.8} />
        </p>
      </div>

    </div>
  );
};

export default SecurityStats;