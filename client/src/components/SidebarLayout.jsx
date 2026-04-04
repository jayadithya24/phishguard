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

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-cyan-500/25 to-sky-500/25 text-cyan-200 ring-1 ring-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
        : "text-slate-200 hover:bg-slate-700/70 hover:text-white"
    }`;
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_10%_10%,#13233d_0%,#091225_35%,#050b19_100%)] text-white">

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed md:relative z-50 bg-slate-900/90 border-r border-cyan-500/20 backdrop-blur-md
        transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
        ${mobileOpen ? "left-0" : "-left-60 md:left-0"}`}
      >

        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">

          <div className="font-semibold text-lg text-cyan-100">
            {collapsed ? "🛡" : "🛡 PhishGuard"}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-cyan-200"
          >
            {collapsed ? "➡" : "⬅"}
          </button>

        </div>

        {/* ===== NAVIGATION ===== */}
        <nav className="flex flex-col p-3 space-y-2">

          <Link
            to="/dashboard"
            className={getNavItemClass("/dashboard")}
          >
            🏠 {!collapsed && "Dashboard"}
          </Link>

          <Link
            to="/scan"
            className={getNavItemClass("/scan")}
          >
            🔍 {!collapsed && "Scan"}
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/analytics"
              className={getNavItemClass("/analytics")}
            >
              📊 {!collapsed && "Analytics"}
            </Link>
          )}

          <Link
            to="/history"
            className={getNavItemClass("/history")}
          >
            🗂 {!collapsed && "History"}
          </Link>

        </nav>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col">

        {/* ===== HEADER ===== */}
        <header className="flex items-center justify-between bg-slate-900/80 border-b border-cyan-500/20 px-6 h-16 backdrop-blur-md">

          {/* Mobile menu button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold tracking-wide text-cyan-100">
            {pageTitle}
          </h2>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-400/35">
              {user?.role}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
              }}
              className="rounded-lg bg-gradient-to-r from-rose-500 to-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-md shadow-red-900/30 transition hover:brightness-110"
            >
              Logout
            </button>

          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default SidebarLayout;