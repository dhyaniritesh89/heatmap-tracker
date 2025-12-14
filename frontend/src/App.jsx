import { useState, useEffect } from "react";

export default function MyApp(){
  return (
    <>
      <LandingPage></LandingPage>
    </>
  );
}

function LandingPage() {
  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="logo">Heatmap</div>
        <div className="actions">
          <button className="btn ghost">Login</button>
          <button className="btn primary">Sign up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h1>
          Build habits.<br />
          <span>Visually.</span>
        </h1>

        <p>
          Track your daily habits using a heatmap.
          No guilt. Just consistency.
        </p>

        <div className="hero-actions">
          <button className="btn primary large">
            Get started for free
          </button>
          <button className="btn ghost large">
            View demo
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Built for consistency · Open source
      </footer>
    </div>
  );
}

