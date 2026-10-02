import React, { useState, useEffect, useRef } from 'react';

const checkpointsData = [
  {
    stage: "01",
    name: "IDEA",
    tagline: "Turn your idea into a possibility.",
    timeframe: "Weeks 1–4",
    offering: "Startup Counselling & Validation Sprints",
    summary: "Problem-solution mapping, customer discovery sprints, and early feasibility analysis.",
    deliverables: ["Lean Canvas Setup", "Problem Validation", "Target Persona Matrix"],
    side: "left"
  },
  {
    stage: "02",
    name: "VALIDATE",
    tagline: "Test, refine, and discover your potential.",
    timeframe: "Weeks 5–8",
    offering: "Pre-seed Research Grants & IP Search",
    summary: "Market sizing, regulatory roadmap, competitive moats, and patent prior art search.",
    deliverables: ["Patent Prior Art", "TAM / SAM / SOM Sizing", "Regulatory Checklist"],
    side: "right"
  },
  {
    stage: "03",
    name: "BUILD",
    tagline: "Turn ideas into real products.",
    timeframe: "Months 3–5",
    offering: "FabLab 3D & Micro-Electronics Bays",
    summary: "Physical prototyping, MVP release, software architecture, and user feedback cycles.",
    deliverables: ["Functional Working MVP", "3D Printing & Circuit PCB", "Beta User Testbed"],
    side: "left"
  },
  {
    stage: "04",
    name: "MENTOR",
    tagline: "Learn from experts and industry mentors.",
    timeframe: "Months 6–9",
    offering: "1-on-1 VC & Industry Founder Advisory",
    summary: "Domain expert pairing, legal structure, governance, and business model refinement.",
    deliverables: ["Expert Advisory Board", "Company Incorporation", "Compliance Setup"],
    side: "right"
  },
  {
    stage: "05",
    name: "LAUNCH",
    tagline: "Take your startup from prototype to market.",
    timeframe: "Months 10–12",
    offering: "Startup Nivesh & Institutional Demo Day",
    summary: "Institutional pitch decks, valuation mechanics, initial customer contracts, and pilot launch.",
    deliverables: ["Institutional Pitch Deck", "First 10 Paying Customers", "Term Sheet Review"],
    side: "left"
  },
  {
    stage: "06",
    name: "GROW",
    tagline: "Scale your idea into impact.",
    timeframe: "Ongoing",
    offering: "Growthpad Scale & Follow-on Capital",
    summary: "Pan-India distribution, international partnerships, Series A prep, and venture debt.",
    deliverables: ["Pan-India Distribution", "Series A VC Syndicate", "Enterprise Pilot Scale"],
    side: "right"
  }
];

// Helper to compute continuous S-curve coordinates (x%, y%) and angle along the curved flight path
function getPathPosition(t) {
  const wave = Math.sin(t * Math.PI * 3);
  const x = 50 + wave * 8; // Curves between 42% and 58%
  const y = 3 + t * 93; // Vertical percentage from 3% to 96%

  const dt = 0.005;
  const nextT = Math.min(1, t + dt);
  const nextWave = Math.sin(nextT * Math.PI * 3);
  const nextX = 50 + nextWave * 8;
  const nextY = 3 + nextT * 93;

  const dx = nextX - x;
  const dy = nextY - y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

  return { x, y, angle };
}

// Standalone Futuristic 3D-Inspired Light Bulb Visual Component
function IdeaSparkBulb({ scrollProgress, stageIndex, totalStages }) {
  const stageProgress = stageIndex / (totalStages - 1);
  const distance = Math.abs(scrollProgress - stageProgress);

  const hasPassed = scrollProgress >= stageProgress - 0.01;
  const isApproaching = distance <= 0.12 && !hasPassed;
  const isIgniting = distance <= 0.035;

  let bulbOpacity = 0.35;
  let bulbScale = 0.88;
  let isLit = false;
  let isFlickering = false;

  if (hasPassed) {
    bulbOpacity = 1;
    bulbScale = isIgniting ? 1.3 : 1.08;
    isLit = true;
  } else if (isApproaching) {
    const closeness = 1 - distance / 0.12;
    bulbOpacity = 0.35 + closeness * 0.55;
    bulbScale = 0.88 + closeness * 0.15;
    isFlickering = true;
  }

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Outer Radial Light Halo */}
      <div
        className={`absolute w-36 h-36 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          isLit
            ? 'bg-gradient-to-r from-amber-400/40 via-yellow-500/30 to-amber-300/20 scale-125 opacity-100'
            : isApproaching
            ? 'bg-amber-400/20 scale-95 opacity-60 animate-pulse'
            : 'bg-amber-400/5 scale-75 opacity-20'
        }`}
      />

      {/* Shockwave Energy Pulse Ring upon Ignition */}
      {isIgniting && (
        <div className="absolute w-44 h-44 rounded-full border border-amber-300/60 animate-ping pointer-events-none" />
      )}

      {/* Orbiting Tiny Energy Particles */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLit ? 'opacity-100' : 'opacity-30'}`}>
        <div className={`absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] ${isLit ? 'animate-bounce' : ''}`} />
        <div className={`absolute bottom-3 right-8 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] ${isLit ? 'animate-pulse' : ''}`} />
        <div className={`absolute top-1/2 -right-2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_6px_#fef08a] ${isLit ? 'animate-ping' : ''}`} />
        <div className={`absolute bottom-1/3 -left-3 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] ${isLit ? 'animate-bounce' : ''}`} />
      </div>

      {/* Standalone Futuristic 3D Glass Light Bulb SVG */}
      <div
        style={{
          opacity: bulbOpacity,
          transform: `scale(${bulbScale})`,
        }}
        className={`relative w-20 h-24 transition-all duration-500 ease-out cursor-pointer ${
          isFlickering ? 'animate-pulse' : ''
        }`}
      >
        <svg
          viewBox="0 0 64 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full transition-all duration-500 ${
            isLit
              ? 'drop-shadow-[0_0_25px_rgba(251,191,36,0.95)]'
              : 'drop-shadow-[0_0_6px_rgba(251,191,36,0.2)]'
          }`}
        >
          <defs>
            <linearGradient id="glassBodyGrad" x1="12" y1="4" x2="52" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor={isLit ? "#fef08a" : "#334155"} stopOpacity={isLit ? "0.35" : "0.15"} />
              <stop offset="0.5" stopColor={isLit ? "#fbbf24" : "#1e293b"} stopOpacity={isLit ? "0.2" : "0.1"} />
              <stop offset="1" stopColor={isLit ? "#d97706" : "#0f172a"} stopOpacity={isLit ? "0.4" : "0.2"} />
            </linearGradient>

            <linearGradient id="filamentGrad" x1="20" y1="20" x2="44" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor={isLit ? "#ffffff" : "#64748b"} />
              <stop offset="0.4" stopColor={isLit ? "#fef08a" : "#f59e0b"} />
              <stop offset="1" stopColor={isLit ? "#fbbf24" : "#d97706"} />
            </linearGradient>

            <linearGradient id="baseMetalGrad" x1="22" y1="56" x2="42" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#475569" />
              <stop offset="0.5" stopColor="#94a3b8" />
              <stop offset="1" stopColor="#1e293b" />
            </linearGradient>

            <filter id="filamentGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={isLit ? "2.5" : "0.8"} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="coreSparkGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={isLit ? "4" : "1"} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Glass Envelope */}
          <path
            d="M 32 6 C 18 6, 10 16, 10 28 C 10 36, 16 42, 20 48 L 22 56 H 42 L 44 48 C 48 42, 54 36, 54 28 C 54 16, 46 6, 32 6 Z"
            fill="url(#glassBodyGrad)"
            stroke={isLit ? "#fde047" : "#475569"}
            strokeWidth={isLit ? "1.8" : "1"}
            strokeOpacity={isLit ? "0.9" : "0.4"}
          />

          {/* Glass Reflection */}
          <path
            d="M 18 16 C 14 22, 14 30, 17 36"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={isLit ? "0.6" : "0.2"}
          />

          {/* Screw Collar Base */}
          <path d="M 22 56 H 42 V 60 H 22 Z" fill="url(#baseMetalGrad)" stroke="#334155" strokeWidth="0.5" />
          <path d="M 24 60 H 40 V 64 H 24 Z" fill="url(#baseMetalGrad)" stroke="#334155" strokeWidth="0.5" />
          <path d="M 26 64 H 38 V 68 H 26 Z" fill="url(#baseMetalGrad)" stroke="#334155" strokeWidth="0.5" />
          <ellipse cx="32" cy="70" rx="4" ry="2" fill="#0f172a" />

          {/* Interior Lead Wires */}
          <line x1="26" y1="56" x2="26" y2="38" stroke={isLit ? "#fef08a" : "#475569"} strokeWidth="1" strokeOpacity="0.7" />
          <line x1="38" y1="56" x2="38" y2="38" stroke={isLit ? "#fef08a" : "#475569"} strokeWidth="1" strokeOpacity="0.7" />

          {/* Inner Glowing Filament */}
          <path
            d="M 26 38 L 28 28 L 32 20 L 36 28 L 38 38"
            fill="none"
            stroke="url(#filamentGrad)"
            strokeWidth={isLit ? "2.5" : "1.2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#filamentGlow)"
          />

          {/* Core Spark Center */}
          <circle
            cx="32"
            cy="22"
            r={isLit ? "4.5" : "2"}
            fill={isLit ? "#ffffff" : "#f59e0b"}
            filter="url(#coreSparkGlow)"
          />

          {/* Spark Rays */}
          {isLit && (
            <g opacity="0.95" filter="url(#coreSparkGlow)">
              <line x1="32" y1="12" x2="32" y2="6" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="42" y1="22" x2="48" y2="22" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="22" y1="22" x2="16" y2="22" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="39" y1="15" x2="44" y2="10" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="25" y1="15" x2="20" y2="10" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default function JourneySection({ onOpenIncubationModal }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const topOffset = rect.top;
      const totalHeight = rect.height - windowHeight / 2;

      if (totalHeight <= 0) return;

      const currentScroll = windowHeight / 2 - topOffset;
      let progress = currentScroll / totalHeight;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate spaceship flight position along the curved trajectory
  const shipPos = getPathPosition(scrollProgress);

  // Generate ACTIVE curve path that stops EXACTLY at the spaceship's position (nothing ahead)
  const generateActiveCurvePathD = (progress) => {
    if (progress <= 0) return "";
    const points = [];
    const steps = Math.max(2, Math.floor(progress * 80));
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * progress;
      const pos = getPathPosition(t);
      points.push(`${i === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`);
    }
    return points.join(' ');
  };

  const activeCurveD = generateActiveCurvePathD(scrollProgress);

  return (
    <section
      id="journey"
      className="relative w-full bg-gradient-to-b from-white via-pink-50/40 to-slate-50 text-slate-900 py-24 lg:py-36 overflow-hidden border-b border-slate-200 select-none"
    >
      {/* Light Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200 text-rose-700 font-label-caps text-xs uppercase tracking-widest font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>🚀 Incubation Cell Mission Trajectory</span>
          </div>

          <h2 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Your Idea Takes Off Here.
          </h2>

          <p className="font-body-lg text-base sm:text-lg text-slate-600 leading-relaxed">
            Scroll down to watch your startup navigate the incubation ecosystem along a curved flight trajectory from inception to market expansion.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-rose-600 uppercase tracking-wider font-semibold">
            <span>Scroll Down to Launch Mission</span>
            <span className="animate-bounce text-sm">↓</span>
          </div>
        </div>

        {/* Spacious Vertical Flight Runway Track */}
        <div ref={trackRef} className="relative w-full max-w-5xl mx-auto min-h-[1700px] lg:min-h-[1900px] py-10">

          {/* SVG Curved Flight Path Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flightCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.8" />
              </linearGradient>

              <filter id="curvePathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Active Glowing Laser Flight Path */}
            {activeCurveD && (
              <path
                d={activeCurveD}
                fill="none"
                stroke="url(#flightCurveGrad)"
                strokeWidth="0.85"
                filter="url(#curvePathGlow)"
              />
            )}
          </svg>

          {/* Spaceship Graphic Gliding Down the Curved Path */}
          <div
            style={{
              left: `${shipPos.x}%`,
              top: `${shipPos.y}%`,
              transform: `translate(-50%, -50%) rotate(${shipPos.angle}deg)`
            }}
            className="absolute z-30 pointer-events-none"
          >
            {/* Futuristic Rocket Ship SVG */}
            <div className="relative w-14 h-16 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
              <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Rocket Body */}
                <path
                  d="M24 2L4 38L12 48L24 42L36 48L44 38L24 2Z"
                  fill="url(#shipBodyGrad)"
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
                {/* Cockpit Canopy */}
                <path
                  d="M24 10L18 26H30L24 10Z"
                  fill="#fb7185"
                  opacity="0.9"
                />
                {/* Engine Thruster Glows */}
                <circle cx="16" cy="44" r="3" fill="#e11d48" />
                <circle cx="32" cy="44" r="3" fill="#e11d48" />
                <circle cx="24" cy="40" r="4.5" fill="#f43f5e" />

                <defs>
                  <linearGradient id="shipBodyGrad" x1="24" y1="2" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0f172a" />
                    <stop offset="0.6" stopColor="#1e293b" />
                    <stop offset="1" stopColor="#be123c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* 6 Sequential Mission Checkpoints */}
          <div className="relative z-10 space-y-28 lg:space-y-36">
            {checkpointsData.map((cp, idx) => {
              const nodeThreshold = idx / (checkpointsData.length - 1);
              const isPassed = scrollProgress >= (nodeThreshold - 0.03);
              const nodePos = getPathPosition(nodeThreshold);

              const isLeft = cp.side === 'left';

              return (
                <div
                  key={cp.stage}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Flight Node Checkpoint Number Badge directly on Curved Path */}
                  <div
                    style={{ left: `${nodePos.x}%` }}
                    className="absolute -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 ${
                        isPassed
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-125 ring-4 ring-rose-200'
                          : 'bg-white border border-slate-300 text-slate-400 scale-100'
                      }`}
                    >
                      {cp.stage}
                    </div>
                  </div>

                  {/* Mission Card Box */}
                  <div
                    className={`w-full md:w-[38%] max-w-sm ml-14 md:ml-0 transition-all duration-700 ease-out transform ${
                      isPassed
                        ? 'opacity-100 translate-y-0 scale-100 filter-none'
                        : 'opacity-40 translate-y-10 scale-95'
                    }`}
                  >
                    <div
                      className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 border ${
                        isPassed
                          ? 'bg-gradient-to-br from-white via-pink-50/90 to-pink-100/60 border-2 border-pink-300 shadow-xl shadow-pink-200/60 hover:border-rose-400'
                          : 'bg-gradient-to-br from-white/90 to-pink-50/40 border border-pink-200/60 shadow-sm'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                          isPassed
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-pink-100 border border-pink-200 text-rose-700'
                        }`}>
                          STAGE {cp.stage} • {cp.timeframe}
                        </span>
                        <span className="text-[10px] text-rose-500 uppercase tracking-widest font-bold">
                          Mission Checkpoint
                        </span>
                      </div>

                      {/* Stage Name & Tagline */}
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {cp.name}
                      </h3>
                      <p className={`text-base font-bold italic mt-1 mb-3 leading-snug transition-colors ${
                        isPassed ? 'text-rose-600' : 'text-slate-500'
                      }`}>
                        "{cp.tagline}"
                      </p>

                      {/* Core Summary */}
                      <p className="text-sm text-slate-700 leading-relaxed mb-5">
                        {cp.summary}
                      </p>

                      {/* Key Deliverables Chips */}
                      <div className="space-y-2 pt-2 border-t border-pink-200/60 mb-6">
                        <span className="text-[10px] text-rose-700 uppercase tracking-wider font-bold block">
                          Stage Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {cp.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2.5 py-1 rounded-lg bg-white/90 border border-pink-200/80 text-xs text-rose-950 font-medium flex items-center gap-1.5 shadow-2xs"
                            >
                              <span className={isPassed ? 'text-rose-600 font-bold' : 'text-slate-400'}>✓</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Launch Action Button */}
                      <button
                        onClick={() => onOpenIncubationModal(cp.name.toLowerCase())}
                        className={`w-full py-3 px-5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          isPassed
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-600/20 hover:scale-[1.02]'
                            : 'bg-pink-100 text-rose-800 border border-pink-200 hover:bg-pink-200'
                        }`}
                      >
                        <span>Apply for {cp.name} Phase</span>
                        <span>→</span>
                      </button>

                    </div>
                  </div>

                  {/* STANDALONE IDEA SPARK LIGHTBULB ON OPPOSITE SIDE OF CURVED TRAJECTORY */}
                  <div className="hidden md:flex md:w-[38%] max-w-sm items-center justify-center pointer-events-none">
                    <IdeaSparkBulb
                      scrollProgress={scrollProgress}
                      stageIndex={idx}
                      totalStages={checkpointsData.length}
                    />
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Footer Progression Ribbon */}
        <div className="mt-16 text-center text-xs text-slate-500 font-mono uppercase tracking-widest flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          <span className="text-rose-600 font-bold">01 IDEA</span>
          <span>→</span>
          <span className="text-rose-600 font-bold">02 VALIDATE</span>
          <span>→</span>
          <span className="text-rose-600 font-bold">03 BUILD</span>
          <span>→</span>
          <span className="text-rose-600 font-bold">04 MENTOR</span>
          <span>→</span>
          <span className="text-rose-600 font-bold">05 LAUNCH</span>
          <span>→</span>
          <span className="text-rose-600 font-bold">06 GROW</span>
        </div>

      </div>
    </section>
  );
}
