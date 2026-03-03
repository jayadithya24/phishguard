import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ==========================================
   🌍 API BASE (DEV + PRODUCTION SAFE)
========================================== */

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://phishguard-jqr9.onrender.com/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <div className="auth-icon">🛡️</div>

      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Login to PhishGuard</p>

      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Login →
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  </div>
);
};

export default Login;