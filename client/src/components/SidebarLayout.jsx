import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLayout = ({ user, setUser, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle =
    location.pathname.replace("/", "").toUpperCase() || "DASHBOARD";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed md:relative z-50 bg-slate-800 border-r border-slate-700
        transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
        ${mobileOpen ? "left-0" : "-left-60 md:left-0"}`}
      >

        <div className="flex items-center justify-between p-4 border-b border-slate-700">

          <div className="font-semibold text-lg">
            {collapsed ? "🛡" : "🛡 PhishGuard"}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white"
          >
            {collapsed ? "➡" : "⬅"}
          </button>

        </div>

        {/* ===== NAVIGATION ===== */}
        <nav className="flex flex-col p-3 space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
          >
            🏠 {!collapsed && "Dashboard"}
          </Link>

          <Link
            to="/scan"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
          >
            🔍 {!collapsed && "Scan"}
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/analytics"
              className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
            >
              📊 {!collapsed && "Analytics"}
            </Link>
          )}

          <Link
            to="/history"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
          >
            🗂 {!collapsed && "History"}
          </Link>

        </nav>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col">

        {/* ===== HEADER ===== */}
        <header className="flex items-center justify-between bg-slate-800 border-b border-slate-700 px-6 h-16">

          {/* Mobile menu button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold tracking-wide">
            {pageTitle}
          </h2>

          <div className="flex items-center gap-3">

            <span className="text-sm text-slate-300">
              {user?.email}
            </span>

            <span className="text-xs px-2 py-1 bg-blue-500 rounded">
              {user?.role}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
              }}
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>

          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-6 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
};

export default SidebarLayout;