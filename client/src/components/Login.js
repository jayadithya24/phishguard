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
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>🔐 Login to PhishGuard</h2>

      <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#00d4ff" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;