import React, { useState, useEffect } from 'react';
import brain from '../../assets/pierc-brain.png';

const stats = [
  {
    value: "500+",
    target: 500,
    prefix: "",
    suffix: "+",
    label: "STARTUPS SUPPORTED",
  },
  {
    value: "₹25+ Cr",
    target: 25,
    prefix: "₹",
    suffix: "+ Cr",
    label: "FUNDING FACILITATED",
  },
  {
    value: "10K+",
    target: 10,
    prefix: "",
    suffix: "K+",
    label: "STUDENTS & INNOVATORS",
  },
  {
    value: "1.2K+",
    target: 1.2,
    prefix: "",
    suffix: "K+",
    isDecimal: true,
    label: "HIGH-VALUE JOBS GENERATED",
  },
  {
    value: "100+",
    target: 100,
    prefix: "",
    suffix: "+",
    label: "EVENTS & PROGRAMS",
  },
];

export default function HeroSection({ onOpenIncubationModal }) {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1600;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((m) => {
          if (m.isDecimal) {
            return Number((m.target * easeProgress).toFixed(1));
          }
          return Math.floor(m.target * easeProgress);
        })
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="hero">
        {/* Background atmosphere */}
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-grid" />

        {/* Decorative particles */}
        <div className="particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* =====================================
            LEFT CONTENT
        ===================================== */}
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>
              PARUL INNOVATION &amp; ENTREPRENEURSHIP RESEARCH CENTRE
            </span>
          </div>

          <h1 className="hero-title">
            <span>IDEATE.</span>
            <span className="accent">INNOVATE.</span>
            <span>INCUBATE.</span>
          </h1>

          <p className="hero-description">
            Where student ideas transform into market-defining ventures and scalable startups. An innovation ecosystem powered by Parul University, for a bolder tomorrow.
          </p>

          <div className="hero-buttons">
            <a
              href="#journey"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('journey');
              }}
              className="primary-button"
            >
              Start Your Journey
              <span>→</span>
            </a>

            <a
              href="#ecosystem-pillars"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('ecosystem-pillars');
              }}
              className="secondary-button"
            >
              <span className="play-icon">▶</span>
              Explore PIERC
            </a>
          </div>
        </div>

        {/* =====================================
            RIGHT BRAIN AREA
        ===================================== */}
        <div className="brain-area">
          <div className="brain-aura" />

          <img
            src={brain}
            alt="Digital innovation brain"
            className="brain-image"
          />

          {/* Right-side label */}
          <div className="brain-label">
            <span>IDEAS</span>
            <span>PEOPLE</span>
            <span className="highlight">TECHNOLOGY</span>
            <span>IMPACT</span>
          </div>

          {/* Bottom label */}
          <div className="building-label">
            <span className="building-line" />
            <div>
              <span>BUILDING</span>
              <span>WHAT'S NEXT</span>
            </div>
          </div>

          {/* Perspective digital floor */}
          <div className="digital-floor" />
        </div>
      </section>

      {/* =========================================
          IMPACT STATISTICS STRIP
      ========================================= */}
      <section className="stats-section" id="impact-metrics-strip">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat" key={stat.label}>
              <div className="stat-number">
                {stat.prefix}
                {counts[index] !== undefined ? counts[index] : stat.target}
                {stat.suffix}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
