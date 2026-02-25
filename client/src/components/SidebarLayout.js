import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLayout = ({ user, setUser, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const pageTitle =
    location.pathname.replace("/", "").toUpperCase() || "DASHBOARD";

  return (
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

  {/* Top Section */}
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

  {/* Middle Navigation */}
  <div className="sidebar-nav">
    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
      🏠 {!collapsed && "Dashboard"}
    </Link>

    <Link to="/scan" className={location.pathname === "/scan" ? "active" : ""}>
      🔍 {!collapsed && "Scan"}
    </Link>

    {user?.role === "admin" && (
      <Link to="/analytics" className={location.pathname === "/analytics" ? "active" : ""}>
        📊 {!collapsed && "Analytics"}
      </Link>
    )}

    <Link to="/history" className={location.pathname === "/history" ? "active" : ""}>
      🗂 {!collapsed && "History"}
    </Link>
  </div>

</div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">

        <div className="top-header">
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