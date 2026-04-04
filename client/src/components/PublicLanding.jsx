import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Fast URL Scanning",
    description: "Scan suspicious links in seconds using our risk engine and threat signals."
  },
  {
    title: "Real-Time Detection",
    description: "Get immediate phishing risk status to act before users click dangerous pages."
  },
  {
    title: "Security Dashboard",
    description: "Track scans, trends, and incident patterns from one clean admin view."
  },
  {
    title: "Actionable Reports",
    description: "Review detailed findings with confidence scores and indicators."
  }
];

const processSteps = [
  {
    title: "Submit URL",
    description: "Paste a URL and start a secure analysis instantly."
  },
  {
    title: "Analyze Risk",
    description: "PhishGuard evaluates domain patterns and phishing indicators."
  },
  {
    title: "Protect Users",
    description: "Use insights to block threats and train your team."
  }
];

const benefits = [
  {
    title: "Fewer Successful Attacks",
    description: "Catch suspicious links before they become incidents."
  },
  {
    title: "Clear Audit Trail",
    description: "Maintain a searchable history of scans and outcomes."
  },
  {
    title: "Admin-Ready Insights",
    description: "Focus on high-risk items with smart summaries."
  },
  {
    title: "Safer Organization",
    description: "Build trust with stronger, proactive phishing defense."
  }
];

const PublicLanding = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight text-white">PhishGuard</h1>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-cyan-300">Features</a>
            <a href="#process" className="transition hover:text-cyan-300">How It Works</a>
            <a href="#benefits" className="transition hover:text-cyan-300">Benefits</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_35%),linear-gradient(180deg,#020617_0%,#020617_50%,#0b1225_100%)]" />
          <div className="relative mx-auto flex min-h-[64vh] w-full max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
            <span className="mb-5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Intelligent Phishing Protection
            </span>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Smart URL Risk Detection for
              <span className="text-cyan-300"> Modern Security Teams</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm text-slate-300 sm:text-base">
              Detect phishing attempts faster with AI-driven analysis, real-time scoring, and centralized reporting for your organization.
            </p>

            <Link
              to="/login"
              className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.3)] transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.45)]"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Features</p>
          <h3 className="mt-2 text-center text-3xl font-bold text-white">Everything you need to stop phishing</h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5 shadow-lg shadow-slate-950/30">
                <h4 className="text-base font-semibold text-cyan-300">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="border-y border-slate-900 bg-slate-900/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <h3 className="text-center text-3xl font-bold text-white">Simple 3-step process</h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
                    {index + 1}
                  </div>
                  <h4 className="text-base font-semibold text-white">{step.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Benefits</p>
          <h3 className="mt-2 text-center text-3xl font-bold text-white">Why choose PhishGuard?</h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5">
                <h4 className="text-base font-semibold text-cyan-300">{item.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        © 2026 PhishGuard | AI-powered phishing detection platform
      </footer>
    </div>
  );
};

export default PublicLanding;