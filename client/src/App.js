import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";

import ScanForm from "./components/ScanForm";
import ResultCard from "./components/ResultCard";
import HistoryTable from "./components/HistoryTable";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ThreatTrendChart from "./components/ThreatTrendChart";
import SecurityStats from "./components/SecurityStats";

import "./App.css";

/* ================= PAGE COMPONENTS ================= */

function DashboardPage() {
  return <SecurityStats />;
}

function ScanPage() {
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="card">
        <h2>🔍 AI Threat Scanner</h2>
        <ScanForm setResult={setResult} />
      </div>

      {result && (
        <div className="card">
          <ResultCard result={result} />
        </div>
      )}
    </>
  );
}

function AnalyticsPage({ user }) {
  if (user?.role !== "admin") {
    return (
      <div className="card">
        <h2>🔒 Access Restricted</h2>
        <p>Analytics are available for admin accounts only.</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <h2>📊 Threat Analytics</h2>
        <AnalyticsDashboard />
      </div>

      <div className="card">
        <h2>📈 Threat Trend</h2>
        <ThreatTrendChart />
      </div>
    </>
  );
}
function HistoryPage({ user }) {
  return (
    <div className="card">
      <h2>🗂 Scan History</h2>
      <HistoryTable user={user} />
    </div>
  );
}

/* ================= MAIN APP ================= */

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Routes>
      {/* ===== LOGIN ===== */}
      <Route
        path="/login"
        element={
          <Login
            onLogin={(token) => {
              const decoded = jwtDecode(token);
              setUser(decoded);
            }}
          />
        }
      />

      {/* ===== REGISTER ===== */}
      <Route path="/register" element={<Register />} />

      {/* ===== PROTECTED ROUTES WITH SIDEBAR ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SidebarLayout user={user} setUser={setUser}>
              <DashboardPage />
            </SidebarLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/scan"
        element={
          <ProtectedRoute>
            <SidebarLayout user={user} setUser={setUser}>
              <ScanPage />
            </SidebarLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <SidebarLayout user={user} setUser={setUser}>
              <AnalyticsPage user={user} />
            </SidebarLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/history"
  element={
    <ProtectedRoute>
      <SidebarLayout user={user} setUser={setUser}>
        <HistoryPage user={user} />
      </SidebarLayout>
    </ProtectedRoute>
  }
/>

      {/* ===== DEFAULT REDIRECT ===== */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;