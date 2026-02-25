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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>🔐 Login to PhishGuard</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
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