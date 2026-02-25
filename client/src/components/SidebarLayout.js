import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLayout = ({ user, setUser, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pageTitle =
    location.pathname.replace("/", "").toUpperCase() || "DASHBOARD";

  return (
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <div
        className={`sidebar 
        ${collapsed ? "collapsed" : ""} 
        ${isMobile ? "mobile" : ""} 
        ${mobileOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {collapsed ? "🛡" : "🛡 PhishGuard"}
          </div>

          {!isMobile && (
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "➡" : "⬅"}
            </button>
          )}

          {isMobile && (
            <button
              className="collapse-btn"
              onClick={() => setMobileOpen(false)}
            >
              ✖
            </button>
          )}
        </div>

        <div className="sidebar-nav">
          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
            🏠 {!collapsed && "Dashboard"}
          </Link>

          <Link to="/scan" onClick={() => setMobileOpen(false)}>
            🔍 {!collapsed && "Scan"}
          </Link>

          {user?.role === "admin" && (
            <Link to="/analytics" onClick={() => setMobileOpen(false)}>
              📊 {!collapsed && "Analytics"}
            </Link>
          )}

          <Link to="/history" onClick={() => setMobileOpen(false)}>
            🗂 {!collapsed && "History"}
          </Link>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">

        <div className="top-header">
          {isMobile && (
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
          )}

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