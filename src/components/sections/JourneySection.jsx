import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, FlaskConical, Hammer, Users, Rocket, TrendingUp } from 'lucide-react';
import ParallaxCard from '../common/ParallaxCard';

/* ==========================================================================
   DESKTOP CHECKPOINTS DATA & HELPERS (PRESERVED UNCHANGED)
   ========================================================================== */
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
  // Aspect-ratio weighted tangent angle for accurate pixel alignment along curve
  const angle = Math.atan2(dy, dx * 0.45) * (180 / Math.PI) + 90;

  return { x, y, angle };
}

// Standalone Futuristic 3D-Inspired Light Bulb Visual Component (Desktop)
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
    <div className="relative flex items-center justify-center p-3">
      {/* Outer Radial Light Halo */}
      <div
        className={`absolute w-28 h-28 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
          isLit
            ? 'bg-gradient-to-r from-amber-400/40 via-yellow-500/30 to-amber-300/20 scale-125 opacity-100'
            : isApproaching
            ? 'bg-amber-400/20 scale-95 opacity-60 animate-pulse'
            : 'bg-amber-400/5 scale-75 opacity-20'
        }`}
      />

      {/* Shockwave Energy Pulse Ring upon Ignition */}
      {isIgniting && (
        <div className="absolute w-32 h-32 rounded-full border border-amber-300/60 animate-ping pointer-events-none" />
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
        className={`relative w-16 h-20 transition-all duration-500 ease-out cursor-pointer ${
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

/* ==========================================================================
   MOBILE CURVED S-PATH DATA & CONFIGURATION (< 768px)
   Matches the 6 Desktop Stages: IDEA, VALIDATE, BUILD, MENTOR, LAUNCH, GROW
   ========================================================================== */
// Smooth continuous harmonic S-shaped cubic bezier path through 380 x 1100 coordinate space
const MOBILE_PATH_D =
  "M 80,25 " +
  "C 85,45 95,60 105,80 " +
  "C 115,115 195,135 215,165 " +
  "C 235,195 270,220 275,250 " +
  "C 280,285 185,305 165,335 " +
  "C 145,365 100,390 105,420 " +
  "C 110,455 195,475 215,505 " +
  "C 235,535 270,560 275,590 " +
  "C 280,625 185,645 165,675 " +
  "C 145,705 100,730 105,760 " +
  "C 110,795 195,815 215,845 " +
  "C 235,875 270,900 275,930 " +
  "C 280,980 220,1030 180,1070";

// 6 Mobile Stages matching the Desktop Sequence Exactly
const mobileStages = [
  {
    stage: "01",
    name: "IDEA",
    description: "Turn your idea into a possibility.",
    icon: "lightbulb",
    side: "right",
    threshold: 0.08,
    topPx: 45,
    nodeX: 105,
    nodeY: 80,
  },
  {
    stage: "02",
    name: "VALIDATE",
    description: "Test, refine, and discover your potential.",
    icon: "flask",
    side: "left",
    threshold: 0.25,
    topPx: 215,
    nodeX: 275,
    nodeY: 250,
  },
  {
    stage: "03",
    name: "BUILD",
    description: "Turn ideas into real products.",
    icon: "build",
    side: "right",
    threshold: 0.42,
    topPx: 385,
    nodeX: 105,
    nodeY: 420,
  },
  {
    stage: "04",
    name: "MENTOR",
    description: "Learn from experts and industry mentors.",
    icon: "mentor",
    side: "left",
    threshold: 0.58,
    topPx: 555,
    nodeX: 275,
    nodeY: 590,
  },
  {
    stage: "05",
    name: "LAUNCH",
    description: "Take your startup from prototype to market.",
    icon: "launch",
    side: "right",
    threshold: 0.75,
    topPx: 725,
    nodeX: 105,
    nodeY: 760,
  },
  {
    stage: "06",
    name: "GROW",
    description: "Scale your idea into impact.",
    icon: "grow",
    side: "left",
    threshold: 0.92,
    topPx: 895,
    nodeX: 275,
    nodeY: 930,
  },
];

// Waypoint dots at the inflection points between stages
const mobileWaypoints = [
  { id: 1, cx: 215, cy: 165, threshold: 0.16 },
  { id: 2, cx: 165, cy: 335, threshold: 0.33 },
  { id: 3, cx: 215, cy: 505, threshold: 0.50 },
  { id: 4, cx: 165, cy: 675, threshold: 0.67 },
  { id: 5, cx: 215, cy: 845, threshold: 0.83 },
];

function getStageIcon(type, isPassed) {
  const iconClass = `w-5 h-5 ${isPassed ? 'text-white' : 'text-primary'}`;
  switch (type) {
    case 'lightbulb':
      return <Lightbulb className={iconClass} />;
    case 'flask':
      return <FlaskConical className={iconClass} />;
    case 'build':
      return <Hammer className={iconClass} />;
    case 'mentor':
      return <Users className={iconClass} />;
    case 'launch':
      return <Rocket className={iconClass} />;
    case 'grow':
      return <TrendingUp className={iconClass} />;
    default:
      return <Rocket className={iconClass} />;
  }
}

// Compact Mobile Spaceship Graphic with Thruster Exhaust Trail
function MobileRocketGraphic() {
  return (
    <g className="pointer-events-none">
      {/* Exhaust Thruster Plume & Flames */}
      <g transform="translate(0, 18)">
        <ellipse cx="0" cy="10" rx="9" ry="14" fill="url(#mobilePlumeGrad)" opacity="0.6" filter="url(#mobilePlumeBlur)" />
        <path d="M-4.5,0 Q0,18 0,24 Q0,18 4.5,0 Z" fill="url(#mobileOuterFlameGrad)" />
        <path d="M-2,0 Q0,12 0,16 Q0,12 2,0 Z" fill="#ffffff" />
        <circle cx="-3.5" cy="20" r="1.3" fill="#fb7185" opacity="0.8" />
        <circle cx="3" cy="24" r="1.1" fill="#facc15" opacity="0.85" />
      </g>

      {/* Main Rocket Ship Body */}
      <g filter="url(#mobileRocketShadow)">
        {/* Aerodynamic Side Wings / Fins */}
        <path d="M-9,5 L-17,15 L-10,16 L-7,12 Z" fill="#be123c" stroke="#9f1239" strokeWidth="0.5" />
        <path d="M9,5 L17,15 L10,16 L7,12 Z" fill="#be123c" stroke="#9f1239" strokeWidth="0.5" />

        {/* Thruster Nozzle */}
        <path d="M-4.5,14 L-5.5,18 H5.5 L4.5,14 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />

        {/* Fuselage Capsule */}
        <path
          d="M0,-21 C7,-12 10,2 9,15 C6,16 -6,16 -9,15 C-10,2 -7,-12 0,-21 Z"
          fill="url(#mobileShipBodyGrad)"
          stroke="#fecdd3"
          strokeWidth="0.8"
        />

        {/* Nose Cone (Pink Accent) */}
        <path
          d="M0,-21 C3.5,-16 6,-9 7,-5 C3.5,-4.2 -3.5,-4.2 -7,-5 C-6,-9 -3.5,-16 0,-21 Z"
          fill="#e11d48"
        />

        {/* Cockpit Porthole Window */}
        <circle cx="0" cy="2" r="4.2" fill="#0f172a" stroke="#ffffff" strokeWidth="0.9" />
        <circle cx="0" cy="2" r="3" fill="url(#mobileCockpitGrad)" />
        <ellipse cx="-1" cy="0.8" rx="1.1" ry="0.7" fill="#ffffff" opacity="0.9" />
      </g>
    </g>
  );
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function JourneySection({ onOpenIncubationModal }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  // Desktop Runway Ref
  const trackRef = useRef(null);

  // Mobile S-Curve Runway & Spaceship Refs
  const mobileTrackRef = useRef(null);
  const mobilePathRef = useRef(null);
  const mobileActivePathRef = useRef(null);
  const mobileCoreLaserRef = useRef(null);
  const mobileShipRef = useRef(null);

  // Update mobile active laser flight path & spaceship transform along path
  const updateMobileTrajectory = (progress) => {
    const path = mobilePathRef.current;
    if (!path) return;

    try {
      const totalLen = path.getTotalLength();
      if (!totalLen) return;

      const clamped = Math.max(0, Math.min(1, progress));
      const currentLen = clamped * totalLen;

      // 1. Update Active Glowing Laser Flight Path (filling up exactly to spaceship)
      const offset = totalLen * (1 - clamped);
      if (mobileActivePathRef.current) {
        mobileActivePathRef.current.style.strokeDasharray = `${totalLen}`;
        mobileActivePathRef.current.style.strokeDashoffset = `${offset}`;
      }
      if (mobileCoreLaserRef.current) {
        mobileCoreLaserRef.current.style.strokeDasharray = `${totalLen}`;
        mobileCoreLaserRef.current.style.strokeDashoffset = `${offset}`;
      }

      // 2. Update Spaceship Position & Dynamic Tangent Heading
      const ship = mobileShipRef.current;
      if (ship) {
        const pt = path.getPointAtLength(currentLen);
        const delta = 2;
        const nextPt = path.getPointAtLength(Math.min(totalLen, currentLen + delta));
        const prevPt = path.getPointAtLength(Math.max(0, currentLen - delta));

        const dx = nextPt.x - prevPt.x;
        const dy = nextPt.y - prevPt.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        ship.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
        const innerGroup = ship.firstElementChild;
        if (innerGroup) {
          innerGroup.setAttribute('transform', `rotate(${angle.toFixed(2)})`);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    let animId;

    const updateScrollProgress = () => {
      const isMobile = window.innerWidth < 768;
      const currentTrack = isMobile
        ? (mobileTrackRef.current || trackRef.current)
        : (trackRef.current || mobileTrackRef.current);

      if (!currentTrack) return;
      const rect = currentTrack.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const topOffset = rect.top;
      const totalHeight = rect.height - windowHeight * (isMobile ? 0.45 : 0.6);

      if (totalHeight <= 0) return;

      const currentScroll = windowHeight * (isMobile ? 0.45 : 0.4) - topOffset;
      let progress = currentScroll / totalHeight;
      targetProgressRef.current = Math.max(0, Math.min(1, progress));
    };

    const handleScroll = () => {
      updateScrollProgress();
    };

    const loop = () => {
      // Smooth exponential decay lerp for buttery scroll tracking
      smoothProgressRef.current += (targetProgressRef.current - smoothProgressRef.current) * 0.12;
      setScrollProgress(smoothProgressRef.current);
      updateMobileTrajectory(smoothProgressRef.current);
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();
    updateMobileTrajectory(smoothProgressRef.current);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Desktop trajectory calculations (preserved)
  const shipPos = getPathPosition(scrollProgress);

  const generateFullCurvePathD = () => {
    const points = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pos = getPathPosition(t);
      points.push(`${i === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`);
    }
    return points.join(' ');
  };

  const generateActiveCurvePathD = (progress) => {
    if (progress <= 0) return "";
    const points = [];
    const steps = Math.max(2, Math.floor(progress * 100));
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * progress;
      const pos = getPathPosition(t);
      points.push(`${i === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`);
    }
    return points.join(' ');
  };

  const fullCurveD = generateFullCurvePathD();
  const activeCurveD = generateActiveCurvePathD(scrollProgress);
  const shipDepthScale = 1 + Math.sin(scrollProgress * Math.PI) * 0.12;

  return (
    <section
      id="journey"
      className="relative w-full bg-gradient-to-b from-white via-pink-50/40 to-[#fff4f6] text-slate-900 py-12 lg:py-24 overflow-hidden border-b border-slate-200 select-none"
    >
      {/* Light Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ==================================================================
            MOBILE SECTION HEADER (< 768px)
            ================================================================== */}
        <div className="block md:hidden mb-8 px-1">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-[11px] uppercase font-label-caps">
            <span className="w-5 h-[2px] bg-primary rounded-full inline-block" />
            <span>Our Ecosystem</span>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            The Innovation Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Follow the journey from an idea to real-world impact.
          </p>
        </div>

        {/* ==================================================================
            DESKTOP SECTION HEADER (>= 768px)
            ================================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 hidden md:block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-pink-200 text-rose-700 font-label-caps text-[11px] uppercase tracking-widest font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>🚀 Incubation Cell Mission Trajectory</span>
          </div>

          <h2 className="font-headline-xl text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Your Idea Takes Off Here.
          </h2>

          <p className="font-body-lg text-sm sm:text-base text-slate-600 leading-relaxed">
            Scroll down to watch your startup navigate the incubation ecosystem along a curved flight trajectory from inception to market expansion.
          </p>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-xs font-mono text-rose-600 uppercase tracking-wider font-semibold">
            <span>Scroll Down to Launch Mission</span>
            <span className="animate-bounce text-sm">↓</span>
          </div>
        </div>

        {/* ==================================================================
            MOBILE CURVED S-PATH RUNWAY (< 768px)
            ================================================================== */}
        <div
          ref={mobileTrackRef}
          className="relative w-full max-w-md mx-auto h-[1100px] select-none block md:hidden mb-4"
        >
          {/* SVG Continuous S-Path, Glowing Laser Path, Numbered Badges & Rocket */}
          <svg
            viewBox="0 0 380 1100"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Active Glowing Laser Flight Gradient (matches Desktop) */}
              <linearGradient id="mobileLaserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
              </linearGradient>

              {/* Laser Beam Glow Filter */}
              <filter id="mobileCurvePathGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Numbered Milestone Badge Shadow */}
              <filter id="mobileBadgeShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#be123c" floodOpacity="0.25" />
              </filter>

              {/* Thruster Plume & Rocket Filters */}
              <filter id="mobilePlumeBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
              </filter>
              <filter id="mobileRocketShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#be123c" floodOpacity="0.25" />
              </filter>
              <linearGradient id="mobilePlumeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#fb923c" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="mobileOuterFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
              <linearGradient id="mobileShipBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="mobileCockpitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* 1. Faint Background Trajectory Guide Path (Dashed) */}
            <path
              ref={mobilePathRef}
              d={MOBILE_PATH_D}
              fill="none"
              stroke="#fbcfe8"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* 2. Active Glowing Laser Flight Path (Dynamically Fills Behind Rocket - Desktop Parity) */}
            <path
              ref={mobileActivePathRef}
              d={MOBILE_PATH_D}
              fill="none"
              stroke="url(#mobileLaserGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#mobileCurvePathGlow)"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: 1400,
              }}
            />

            {/* Core Intense White Laser Beam */}
            <path
              ref={mobileCoreLaserRef}
              d={MOBILE_PATH_D}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: 1400,
              }}
            />

            {/* 3. Subtle Waypoint Dots at Inflection Crossings */}
            {mobileWaypoints.map((w) => {
              const isPassed = scrollProgress >= w.threshold;
              return (
                <circle
                  key={w.id}
                  cx={w.cx}
                  cy={w.cy}
                  r={isPassed ? "4" : "3.5"}
                  fill={isPassed ? "#e11d48" : "#ffffff"}
                  stroke={isPassed ? "#ffffff" : "#f472b6"}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* 4. Numbered Checkpoint Badges DIRECTLY ON THE PATH (01 to 06) */}
            {mobileStages.map((stage) => {
              const isPassed = scrollProgress >= stage.threshold - 0.03;

              return (
                <g
                  key={`badge-${stage.stage}`}
                  transform={`translate(${stage.nodeX}, ${stage.nodeY})`}
                  className="transition-all duration-500 pointer-events-none"
                >
                  {/* Outer Pulse Ring when Rocket Reaches/Passes */}
                  {isPassed && (
                    <circle
                      cx="0"
                      cy="0"
                      r="18"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      opacity="0.45"
                      className="animate-ping"
                    />
                  )}

                  {/* Main Circular Number Badge on Path */}
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill={isPassed ? "#e11d48" : "#ffffff"}
                    stroke={isPassed ? "#ffffff" : "#f472b6"}
                    strokeWidth={isPassed ? "2.5" : "2"}
                    filter="url(#mobileBadgeShadow)"
                    className="transition-all duration-500"
                  />

                  {/* Stage Number Text (01, 02, 03, 04, 05, 06) */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={isPassed ? "#ffffff" : "#be123c"}
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="monospace"
                    className="transition-colors duration-500 select-none"
                  >
                    {stage.stage}
                  </text>
                </g>
              );
            })}

            {/* 5. Scroll-Driven Gliding Spaceship Following Tangent of the Path */}
            <g ref={mobileShipRef} transform="translate(80, 25)">
              <g transform="rotate(45)" className="pointer-events-none">
                <MobileRocketGraphic />
              </g>
            </g>
          </svg>

          {/* 6 Alternating Stage Cards (Matching Desktop Sequence) */}
          {mobileStages.map((stage) => {
            const isPassed = scrollProgress >= stage.threshold;
            const isRight = stage.side === 'right';

            return (
              <div
                key={stage.name}
                style={{ top: `${stage.topPx}px` }}
                className={`absolute z-20 w-[58%] max-w-[225px] transition-all duration-300 ${
                  isRight ? 'right-2.5 sm:right-4' : 'left-2.5 sm:left-4'
                }`}
              >
                <div
                  onClick={() => onOpenIncubationModal && onOpenIncubationModal(stage.name.toLowerCase())}
                  className={`p-3 sm:p-3.5 rounded-[18px] sm:rounded-[20px] bg-white/95 backdrop-blur-sm transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
                    isPassed
                      ? 'border-primary/50 shadow-[0_6px_20px_rgba(225,29,72,0.12)] scale-[1.02]'
                      : 'border-pink-200/80 shadow-[0_4px_16px_rgba(225,29,72,0.05)] opacity-85 hover:opacity-100 hover:border-primary/30'
                  }`}
                >
                  {/* Stage Icon */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isPassed ? 'bg-primary text-white shadow-sm' : 'bg-pink-50 text-primary'
                    }`}
                  >
                    {getStageIcon(stage.icon, isPassed)}
                  </div>

                  {/* Stage Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 leading-none">
                      {stage.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-tight mt-1">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================================
            MOBILE PROGRESSION RIBBON (< 768px)
            ================================================================== */}
        <div className="mt-4 text-center text-[10px] text-slate-500 font-mono uppercase tracking-wider flex md:hidden items-center justify-center gap-1.5 sm:gap-2 flex-wrap px-2">
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

        {/* ==================================================================
            DESKTOP VERTICAL FLIGHT RUNWAY TRACK (>= 768px) (PRESERVED)
            ================================================================== */}
        <div ref={trackRef} className="relative w-full max-w-4xl mx-auto min-h-[1200px] lg:min-h-[1350px] py-6 hidden md:block">

          {/* SVG Curved Flight Path Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flightCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.85" />
              </linearGradient>

              <filter id="curvePathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Faint Background Trajectory Guide Path */}
            <path
              d={fullCurveD}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
              opacity="0.6"
            />

            {/* Active Glowing Laser Flight Path */}
            {activeCurveD && (
              <path
                d={activeCurveD}
                fill="none"
                stroke="url(#flightCurveGrad)"
                strokeWidth="0.9"
                filter="url(#curvePathGlow)"
              />
            )}
          </svg>

          {/* Spaceship Graphic Gliding Down the Curved Path */}
          <div
            style={{
              left: `${shipPos.x}%`,
              top: `${shipPos.y}%`,
              transform: `translate(-50%, -50%) rotate(${shipPos.angle}deg) scale(${shipDepthScale})`,
            }}
            className="absolute z-30 pointer-events-none"
          >
            {/* Thruster Energy Particles Trail */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
              <span className="w-1.5 h-4 rounded-full bg-rose-500 blur-[2px] animate-pulse" />
              <span className="w-2 h-6 rounded-full bg-amber-400 blur-[2px] animate-ping" />
              <span className="w-1.5 h-4 rounded-full bg-rose-500 blur-[2px] animate-pulse" />
            </div>

            {/* Futuristic Rocket Ship SVG */}
            <div className="relative w-11 h-14 drop-shadow-[0_0_20px_rgba(244,63,94,0.75)]">
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
                  opacity="0.95"
                />
                {/* Engine Thruster Glows */}
                <circle cx="16" cy="44" r="3.5" fill="#e11d48" />
                <circle cx="32" cy="44" r="3.5" fill="#e11d48" />
                <circle cx="24" cy="40" r="5" fill="#f43f5e" />

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
          <div className="relative z-10 space-y-16 lg:space-y-24">
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
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold transition-all duration-500 ${
                        isPassed
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-110 ring-3 ring-rose-200'
                          : 'bg-white border border-slate-300 text-slate-400 scale-100'
                      }`}
                    >
                      {cp.stage}
                    </div>
                  </div>

                  {/* Mission Card Box */}
                  <div
                    className={`w-full md:w-[38%] max-w-md px-2 sm:px-0 transition-all duration-700 ease-out transform ${
                      isPassed
                        ? 'opacity-100 translate-y-0 scale-100 filter-none'
                        : 'opacity-40 translate-y-8 scale-95'
                    }`}
                  >
                    <ParallaxCard
                      index={idx}
                      className={`p-4 sm:p-6 rounded-2xl transition-all duration-500 border ${
                        isPassed
                          ? 'bg-gradient-to-br from-white via-pink-50/90 to-pink-100/60 border-2 border-pink-300 shadow-lg shadow-pink-200/50 hover:border-rose-400'
                          : 'bg-gradient-to-br from-white/90 to-pink-50/40 border border-pink-200/60 shadow-2xs'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          isPassed
                            ? 'bg-rose-500 text-white shadow-2xs'
                            : 'bg-pink-100 border border-pink-200 text-rose-700'
                        }`}>
                          STAGE {cp.stage} • {cp.timeframe}
                        </span>
                        <span className="text-[9px] text-rose-500 uppercase tracking-widest font-bold">
                          Mission Checkpoint
                        </span>
                      </div>

                      {/* Stage Name & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {cp.name}
                      </h3>
                      <p className={`text-sm font-bold italic mt-0.5 mb-2.5 leading-snug transition-colors ${
                        isPassed ? 'text-rose-600' : 'text-slate-500'
                      }`}>
                        "{cp.tagline}"
                      </p>

                      {/* Core Summary */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                        {cp.summary}
                      </p>

                      {/* Key Deliverables Chips */}
                      <div className="space-y-1.5 pt-2 border-t border-pink-200/60 mb-4">
                        <span className="text-[9px] text-rose-700 uppercase tracking-wider font-bold block">
                          Stage Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cp.deliverables.map((item, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2 py-0.5 rounded-md bg-white/90 border border-pink-200/80 text-[11px] text-rose-950 font-medium flex items-center gap-1 shadow-2xs"
                            >
                              <span className={isPassed ? 'text-rose-600 font-bold' : 'text-slate-400'}>✓</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Launch Action Button */}
                      <button
                        onClick={() => onOpenIncubationModal && onOpenIncubationModal(cp.name.toLowerCase())}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          isPassed
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-600/20 hover:scale-[1.01]'
                            : 'bg-pink-100 text-rose-800 border border-pink-200 hover:bg-pink-200'
                        }`}
                      >
                        <span>Apply for {cp.name} Phase</span>
                        <span>→</span>
                      </button>

                    </ParallaxCard>
                  </div>

                  {/* STANDALONE IDEA SPARK LIGHTBULB ON OPPOSITE SIDE OF CURVED TRAJECTORY */}
                  <div className="hidden md:flex md:w-[36%] max-w-xs items-center justify-center pointer-events-none">
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

        {/* Desktop Footer Progression Ribbon (>= 768px) */}
        <div className="mt-10 text-center text-xs text-slate-500 font-mono uppercase tracking-widest hidden md:flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
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

      {/* ==================================================================
          MOBILE BOTTOM BLUSH CLOUD WAVES (< 768px)
          ================================================================== */}
      <div className="block md:hidden w-full -mt-6 pointer-events-none relative z-10">
        <svg
          viewBox="0 0 400 90"
          className="w-full h-20 text-[#fce4ec]"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,45 C70,25 130,55 200,35 C270,15 330,45 400,25 L400,90 L0,90 Z"
            fill="#fdebed"
            opacity="0.8"
          />
          <path
            d="M0,60 C90,40 160,70 240,50 C320,30 360,55 400,45 L400,90 L0,90 Z"
            fill="#fce2e8"
            opacity="0.9"
          />
          <path
            d="M0,75 C100,60 180,80 270,65 C340,55 380,70 400,65 L400,90 L0,90 Z"
            fill="#fcd8e1"
          />
        </svg>
      </div>
    </section>
  );
}
