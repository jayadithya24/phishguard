import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin(data.token);
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_88%_18%,rgba(59,130,246,0.16),transparent_35%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1225_100%)]" />

        <Link
          to="/"
          className="absolute left-4 top-4 z-20 rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200 sm:left-6 sm:top-6"
        >
          ← Back to Landing Page
        </Link>

        <div className="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-10 px-4 py-10 pt-20 md:grid-cols-2 md:items-center md:px-6 md:pt-10">
          <section className="hidden md:block">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              PhishGuard secure access
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
              Sign in to monitor threats faster and protect every click.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Access your phishing scans, review high-risk URLs, and track security trends from one central dashboard.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-white">Fast Detection</h3>
                <p className="mt-2 text-sm text-slate-300">Scan suspicious links in seconds.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-white">Risk Insights</h3>
                <p className="mt-2 text-sm text-slate-300">Prioritize threats by confidence score.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <h3 className="font-semibold text-white">Audit History</h3>
                <p className="mt-2 text-sm text-slate-300">Track all reports and responses.</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl shadow-black/40 backdrop-blur md:p-8">
            <p className="text-sm font-semibold text-cyan-300">Account access</p>
            <h2 className="mt-2 text-4xl font-bold text-white">Welcome back, security analyst</h2>

            <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-800 p-1 text-sm font-semibold">
              <span className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 py-2 text-center text-slate-950">
                Login
              </span>
              <Link to="/register" className="rounded-lg py-2 text-center text-slate-300 transition hover:text-white">
                Register
              </Link>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-slate-300">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 pr-11 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 text-slate-400 transition hover:text-cyan-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 font-bold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-400">
              New to PhishGuard?{" "}
              <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;