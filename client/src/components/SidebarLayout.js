import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLayout = ({ user, setUser, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle =
    location.pathname.replace("/", "").toUpperCase() || "DASHBOARD";

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="layout">

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`sidebar 
        ${collapsed ? "collapsed" : ""} 
        ${mobileOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {collapsed ? "🛡" : "🛡 PhishGuard"}
          </div>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "➡" : "⬅"}
          </button>
        </div>

        <div className="sidebar-nav">
          <Link to="/dashboard">
            🏠 {!collapsed && "Dashboard"}
          </Link>

          <Link to="/scan">
            🔍 {!collapsed && "Scan"}
          </Link>

          {user?.role === "admin" && (
            <Link to="/analytics">
              📊 {!collapsed && "Analytics"}
            </Link>
          )}

          <Link to="/history">
            🗂 {!collapsed && "History"}
          </Link>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">

        <div className="top-header">

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <h2>{pageTitle}</h2>

          <div className="header-right">
            <span className="user-email">{user?.email}</span>
            <span className="role-badge">{user?.role}</span>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="page-content">
          {children}
        </div>

      </div>
    </div>
  );
};

export default SidebarLayout;