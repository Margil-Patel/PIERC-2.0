import React, { useState, useEffect, useRef } from 'react';
import brainstormingImg from '../../assets/brainstorming-team.jpg';

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

  // Bulb Cursor Distance Reactive Glow State & Spaceship Flight Engine
  const bulbRef = useRef(null);
  const shipRef = useRef(null);
  const targetGlowRef = useRef(0);
  const currentGlowRef = useRef(0);
  const [glowState, setGlowState] = useState(0);

  // Spaceship flight state
  const [isSpaceshipMode, setIsSpaceshipMode] = useState(false);
  const flightStateRef = useRef('IDLE'); // 'IDLE' | 'IGNITED' | 'FLYING' | 'HOVER'
  const currentAngleRef = useRef(0);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const ignitionTimerRef = useRef(null);

  const handleIgniteSpaceship = () => {
    if (!isSpaceshipMode) {
      setIsSpaceshipMode(true);
      flightStateRef.current = 'IGNITED';
    }
  };

  // Monitor glowState for automatic ignition after close proximity
  useEffect(() => {
    if (glowState > 0.55) {
      if (!ignitionTimerRef.current && !isSpaceshipMode) {
        ignitionTimerRef.current = setTimeout(() => {
          handleIgniteSpaceship();
        }, 1200);
      }
    } else {
      if (ignitionTimerRef.current) {
        clearTimeout(ignitionTimerRef.current);
        ignitionTimerRef.current = null;
      }
    }
  }, [glowState, isSpaceshipMode]);

  // Catmull-Rom Spline Waypoints across Hero Section (relative to bulb origin)
  const WAYPOINTS = [
    { x: 0, y: 0 },         // 0: Origin bulb position
    { x: -180, y: -70 },    // 1: Initial upward takeoff launch
    { x: -440, y: -120 },   // 2: High cruise over "INNOVATE" title
    { x: -640, y: -60 },    // 3: Sweeping arc over "IDEATE"
    { x: -700, y: 70 },     // 4: Banked turn down left margin
    { x: -540, y: 200 },    // 5: Arching under "INCUBATE" heading right
    { x: -260, y: 260 },    // 6: Gliding under table with brainstorming team
    { x: 60, y: 150 },      // 7: Arching up around right side of team
    { x: 20, y: 30 },       // 8: Smooth braking deceleration approach
    { x: 0, y: 0 }          // 9: Touchdown & docking back at base
  ];

  const getSplinePoint = (waypoints, t) => {
    const numSegments = waypoints.length - 1;
    const p = Math.max(0, Math.min(numSegments, t * numSegments));
    const i = Math.min(numSegments - 1, Math.floor(p));
    const u = p - i;

    const p0 = waypoints[Math.max(0, i - 1)];
    const p1 = waypoints[i];
    const p2 = waypoints[Math.min(waypoints.length - 1, i + 1)];
    const p3 = waypoints[Math.min(waypoints.length - 1, i + 2)];

    const u2 = u * u;
    const u3 = u2 * u;

    const x = 0.5 * (
      (2 * p1.x) +
      (-p0.x + p2.x) * u +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3
    );

    const y = 0.5 * (
      (2 * p1.y) +
      (-p0.y + p2.y) * u +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3
    );

    const dx = 0.5 * (
      (-p0.x + p2.x) +
      2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u +
      3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u2
    );

    const dy = 0.5 * (
      (-p0.y + p2.y) +
      2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u +
      3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u2
    );

    return { x, y, dx, dy };
  };

  // High-Performance Hardware-Accelerated Animation Loop (60/120 FPS)
  useEffect(() => {
    let animId;
    let startTime = null;

    const updateFlight = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      if (isSpaceshipMode && shipRef.current) {
        if (flightStateRef.current === 'IGNITED') {
          startTime = timestamp;
          flightStateRef.current = 'FLYING';
        }

        if (flightStateRef.current === 'FLYING') {
          const flightDuration = 8.5; // Majestic 8.5s flight loop
          const currentElapsed = (timestamp - startTime) / 1000;
          let t = currentElapsed / flightDuration;

          if (t >= 1) {
            t = 1;
            flightStateRef.current = 'HOVER';
          }

          // Smooth cosine curve for acceleration & braking
          const easedT = 0.5 - 0.5 * Math.cos(t * Math.PI);
          const { x, y, dx, dy } = getSplinePoint(WAYPOINTS, easedT);

          // Calculate forward tangent angle
          let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

          // Shortest-path angle unwrapping (no 360° flip pops)
          let deltaAngle = (targetAngle - currentAngleRef.current) % 360;
          if (deltaAngle > 180) deltaAngle -= 360;
          if (deltaAngle < -180) deltaAngle += 360;

          currentAngleRef.current += deltaAngle * 0.14;

          // Aerodynamic bank roll in turns
          const bankRoll = Math.max(-22, Math.min(22, deltaAngle * 0.55));
          const finalAngle = currentAngleRef.current + bankRoll;

          // Smooth depth scale zoom
          const scale = 1.12 + Math.sin(easedT * Math.PI) * 0.22;

          // Interactive subtle mouse steering reaction
          const mx = mouseOffsetRef.current.x * 0.04;
          const my = mouseOffsetRef.current.y * 0.04;

          shipRef.current.style.transform = `translate3d(${(x + mx).toFixed(2)}px, ${(y + my).toFixed(2)}px, 0px) rotate(${finalAngle.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        } else if (flightStateRef.current === 'HOVER') {
          // Organic floating hover with thruster micro-adjustments
          const hoverY = Math.sin(elapsed * 2.2) * 5;
          const hoverX = Math.cos(elapsed * 1.8) * 3;
          const hoverAngle = Math.sin(elapsed * 1.5) * 2.5;

          const mx = mouseOffsetRef.current.x * 0.04;
          const my = mouseOffsetRef.current.y * 0.04;

          shipRef.current.style.transform = `translate3d(${(hoverX + mx).toFixed(2)}px, ${(hoverY + my).toFixed(2)}px, 0px) rotate(${hoverAngle.toFixed(2)}deg) scale(1.12)`;
        }
      }

      animId = requestAnimationFrame(updateFlight);
    };

    animId = requestAnimationFrame(updateFlight);
    return () => cancelAnimationFrame(animId);
  }, [isSpaceshipMode]);

  // Stats Animation Counter
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

  // Continuous Cursor Distance Calculation & Mouse Offset Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bulbRef.current) return;
      const rect = bulbRef.current.getBoundingClientRect();
      const bulbX = rect.left + rect.width / 2;
      const bulbY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - bulbX, e.clientY - bulbY);
      const maxDistance = 380; // Distance in px where bulb reacts

      mouseOffsetRef.current = {
        x: e.clientX - bulbX,
        y: e.clientY - bulbY
      };

      const rawTarget = Math.max(0, 1 - dist / maxDistance);
      targetGlowRef.current = Math.pow(rawTarget, 1.4);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const updateGlow = () => {
      currentGlowRef.current += (targetGlowRef.current - currentGlowRef.current) * 0.12;
      setGlowState(currentGlowRef.current);
      animationFrameId = requestAnimationFrame(updateGlow);
    };

    animationFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic visual calculations based on continuous cursor glow (0 to 1)
  const glowRadius = 14 + glowState * 28; // Radial glow radius px
  const glowOpacity = 0.25 + glowState * 0.75;
  const filamentBrightness = 0.5 + glowState * 0.5;
  const particleShift = glowState * 10; // Particles drift inward toward bulb

  return (
    <>
      <style>{`
        /* Continuous Subtle Idle Breathing for Base Scene */
        @keyframes naturalIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-0.8px); }
        }

        /* Person 3 (Center) — Primary Speaker (Gesturing & Talking) */
        @keyframes person3HeadTalk {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          8% { transform: rotate(-1.8deg) translateY(-0.8px); }
          18% { transform: rotate(1.2deg) translateY(0.5px); }
          28% { transform: rotate(-0.8deg) translateY(-0.5px); }
          35%, 68% { transform: rotate(0deg) translateY(0); }
          75% { transform: rotate(1.5deg) translateY(-0.5px); }
          85% { transform: rotate(-1deg) translateY(0); }
        }

        @keyframes person3ArmGesture {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          10% { transform: translateY(-2.5px) rotate(-1.5deg); }
          22% { transform: translateY(-1px) rotate(0.8deg); }
          32% { transform: translateY(0) rotate(0deg); }
          72% { transform: translateY(-1.5px) rotate(-1deg); }
          82% { transform: translateY(0) rotate(0deg); }
        }

        /* Person 4 (Right/Back) — Responding Speaker */
        @keyframes person4HeadRespond {
          0%, 20%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-2.5deg) translateY(-0.5px); }
          35% { transform: rotate(-1deg) translateY(1.2px); }
          45% { transform: rotate(1.8deg) translateY(-0.8px); }
          55% { transform: rotate(0deg) translateY(0); }
        }

        @keyframes person4ArmGesture {
          0%, 22%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-3px) rotate(-2deg); }
          42% { transform: translateY(-1px) rotate(-0.5deg); }
          52% { transform: translateY(0) rotate(0deg); }
        }

        /* Person 1 (Left/Front) — Listening & Laptop user */
        @keyframes person1HeadListen {
          0%, 38%, 100% { transform: rotate(0deg) translateY(0); }
          42% { transform: rotate(2.2deg) translateY(-0.5px); }
          52% { transform: rotate(1.5deg) translateY(1.5px); }
          60% { transform: rotate(0.5deg) translateY(0.8px); }
          68% { transform: rotate(0deg) translateY(0); }
        }

        @keyframes person1HandLaptop {
          0%, 40%, 100% { transform: translateX(0) translateY(0); }
          48% { transform: translateX(1.5px) translateY(-1px); }
          58% { transform: translateX(0.5px) translateY(0); }
          65% { transform: translateX(0) translateY(0); }
        }

        /* Person 2 (Left/Back) — Explaining & Pointing */
        @keyframes person2HeadPoint {
          0%, 55%, 100% { transform: rotate(0deg) translateY(0); }
          60% { transform: rotate(-1.8deg) translateY(-0.5px); }
          70% { transform: rotate(-1deg) translateY(1.2px); }
          80% { transform: rotate(1.2deg) translateY(0); }
          88% { transform: rotate(0deg) translateY(0); }
        }

        @keyframes person2ArmPoint {
          0%, 58%, 100% { transform: translateY(0) rotate(0deg); }
          65% { transform: translateY(-2.5px) rotate(1.5deg); }
          76% { transform: translateY(-1px) rotate(0.5deg); }
          85% { transform: translateY(0) rotate(0deg); }
        }

        /* Person 5 (Right/Front) — Sticky Note Organizer */
        @keyframes person5HeadWatch {
          0%, 72%, 100% { transform: rotate(0deg) translateY(0); }
          78% { transform: rotate(-2.2deg) translateY(-0.5px); }
          86% { transform: rotate(-1.2deg) translateY(1.2px); }
          94% { transform: rotate(0deg) translateY(0); }
        }

        @keyframes person5HandNotes {
          0%, 70%, 100% { transform: translateX(0) translateY(0); }
          77% { transform: translateX(-2px) translateY(-1px); }
          87% { transform: translateX(-0.5px) translateY(0); }
          95% { transform: translateX(0) translateY(0); }
        }

        /* Idea Bulb Pulsing synced with Center Person's Gesture */
        @keyframes bulbIdeaPulse {
          0%, 100% { opacity: 0; transform: scale(0.95); }
          8%, 20% { opacity: 1; transform: scale(1.18); }
          32% { opacity: 0; transform: scale(0.98); }
        }

        @keyframes particleIdeaFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          10%, 25% { transform: translateY(-14px) scale(1.5); opacity: 0.95; }
          35% { transform: translateY(-22px) scale(0.8); opacity: 0.2; }
        }

        /* Spaceship Rocket Thruster Ignition Animations */
        @keyframes rocketFlamePulse {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.9; }
          50% { transform: scaleY(1.35) scaleX(1.2); opacity: 1; filter: drop-shadow(0 0 16px #f97316); }
        }

        @keyframes rocketThrustHover {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-1.5deg); }
        }

        @keyframes ignitionBlast {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* Silky Smooth Continuous Flight Path */
        @keyframes spaceshipSmoothFlight {
          0% {
            transform: translate3d(0px, 0px, 0px) rotate(0deg) scale(1);
          }
          /* Takeoff & cruise left towards three big words */
          14% {
            transform: translate3d(-240px, -45px, 0px) rotate(-40deg) scale(1.2);
          }
          /* Arching around top of three big words (IDEATE. INNOVATE. INCUBATE.) */
          30% {
            transform: translate3d(-520px, -135px, 0px) rotate(-120deg) scale(1.3);
          }
          /* Sweeping around left outer side of three big words */
          44% {
            transform: translate3d(-650px, 30px, 0px) rotate(-200deg) scale(1.25);
          }
          /* Sweeping under bottom of three big words heading right towards table */
          58% {
            transform: translate3d(-480px, 180px, 0px) rotate(-280deg) scale(1.2);
          }
          /* Gliding under table where group of people is discussing */
          74% {
            transform: translate3d(-140px, 270px, 0px) rotate(-340deg) scale(1.15);
          }
          /* Ascending back up from under table towards docking position */
          88% {
            transform: translate3d(25px, 90px, 0px) rotate(-385deg) scale(1.2);
          }
          /* Touchdown & docking into steady hover */
          100% {
            transform: translate3d(0px, 0px, 0px) rotate(-360deg) scale(1.15);
          }
        }
      `}</style>
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="hero" id="main-hero-section">
        {/* Background atmosphere */}
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

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
            LEFT CONTENT (PRESERVED EXACTLY)
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
            RIGHT BRAINstorming INCUBATION CELL VISUAL
        ===================================== */}
        <div className="brain-area relative flex flex-col items-center justify-center">

          {/* =====================================
              FUTURISTIC CURSOR-REACTIVE IDEA BULB
          ===================================== */}
          <div
            ref={bulbRef}
            onClick={handleIgniteSpaceship}
            title="Click to launch Incubation Spaceship!"
            className="relative z-20 mt-24 sm:mt-36 mb-[-40px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{
              transform: `translateY(${-glowState * 6}px)`
            }}
          >
            {/* Soft Ambient Radial Light Halo */}
            <div
              className="absolute rounded-full pointer-events-none transition-all duration-300"
              style={{
                width: `${glowRadius * 6}px`,
                height: `${glowRadius * 6}px`,
                background: `radial-gradient(circle, rgba(253, 224, 71, ${glowOpacity * 0.45}) 0%, rgba(244, 63, 94, ${glowOpacity * 0.25}) 50%, transparent 80%)`,
                filter: `blur(${16 + glowState * 12}px)`,
              }}
            />

            {/* Idea Sync Warm Glow Pulse when Center Speaker Gestures */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(253, 224, 71, 0.65) 0%, rgba(244, 63, 94, 0.3) 60%, transparent 80%)',
                filter: 'blur(16px)',
                animation: 'bulbIdeaPulse 12s ease-in-out infinite'
              }}
            />

            {/* Micro Particles drifting toward bulb as center person gestures / cursor approaches */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047] transition-all duration-500"
                style={{
                  top: '-10px',
                  left: `calc(15% + ${particleShift}px)`,
                  opacity: 0.4 + glowState * 0.6,
                  animation: 'particleIdeaFloat 12s ease-in-out infinite'
                }}
              />
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] transition-all duration-500"
                style={{
                  top: '20px',
                  right: `calc(10% + ${particleShift}px)`,
                  opacity: 0.4 + glowState * 0.6,
                  animation: 'particleIdeaFloat 12s ease-in-out infinite 0.4s'
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_12px_#facc15] transition-all duration-500"
                style={{
                  bottom: '10px',
                  left: `calc(20% + ${particleShift}px)`,
                  opacity: 0.3 + glowState * 0.7,
                  animation: 'particleIdeaFloat 12s ease-in-out infinite 0.8s'
                }}
              />
            </div>

            {/* Graphic Container (Bulb morphs into Spaceship Rocket on Ignition) */}
            <div className="relative w-20 h-28 sm:w-24 sm:h-32 flex items-center justify-center">
              
              {/* STATE 1: IDEA BULB SVG */}
              <div
                className="absolute inset-0 transition-all duration-500 flex items-center justify-center pointer-events-none"
                style={{
                  opacity: isSpaceshipMode ? 0 : 1,
                  transform: isSpaceshipMode ? 'scale(0.7) translateY(12px) rotate(-10deg)' : 'scale(1) translateY(0)',
                  filter: `drop-shadow(0 0 ${4 + glowState * 14}px rgba(253, 224, 71, 0.6))`
                }}
              >
                <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    {/* Glass Body Fill Gradient */}
                    <linearGradient id="glassBodyGrad" x1="16" y1="6" x2="64" y2="76" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" stopOpacity={0.4 + glowState * 0.3} />
                      <stop offset="0.5" stopColor={glowState > 0.4 ? "#fef08a" : "#f1f5f9"} stopOpacity={0.25 + glowState * 0.3} />
                      <stop offset="1" stopColor={glowState > 0.4 ? "#fbbf24" : "#e2e8f0"} stopOpacity={0.35 + glowState * 0.3} />
                    </linearGradient>

                    {/* Filament Gradient */}
                    <linearGradient id="filamentGrad" x1="26" y1="26" x2="54" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" />
                      <stop offset="0.4" stopColor={glowState > 0.3 ? "#fde047" : "#fb7185"} />
                      <stop offset="1" stopColor={glowState > 0.3 ? "#f59e0b" : "#e11d48"} />
                    </linearGradient>

                    {/* Base Metallic Collar Gradient */}
                    <linearGradient id="baseMetalGrad" x1="28" y1="72" x2="52" y2="92" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#94a3b8" />
                      <stop offset="0.5" stopColor="#cbd5e1" />
                      <stop offset="1" stopColor="#64748b" />
                    </linearGradient>

                    {/* Dynamic Glow Filter */}
                    <filter id="filamentGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation={1.5 + glowState * 3.5} result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Glass Envelope */}
                  <path
                    d="M 40 8 C 22 8, 12 20, 12 36 C 12 46, 20 54, 25 62 L 28 72 H 52 L 55 62 C 60 54, 68 46, 68 36 C 68 20, 58 8, 40 8 Z"
                    fill="url(#glassBodyGrad)"
                    stroke={glowState > 0.3 ? "#facc15" : "#cbd5e1"}
                    strokeWidth={1.5 + glowState * 0.8}
                    strokeOpacity={0.6 + glowState * 0.4}
                  />

                  {/* Glass Curved Highlight Reflection */}
                  <path
                    d="M 22 20 C 17 28, 17 38, 21 46"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity={0.4 + glowState * 0.5}
                  />

                  {/* Base Metallic Collar */}
                  <path d="M 28 72 H 52 V 77 H 28 Z" fill="url(#baseMetalGrad)" stroke="#475569" strokeWidth="0.5" />
                  <path d="M 30 77 H 50 V 82 H 30 Z" fill="url(#baseMetalGrad)" stroke="#475569" strokeWidth="0.5" />
                  <path d="M 32 82 H 48 V 87 H 32 Z" fill="url(#baseMetalGrad)" stroke="#475569" strokeWidth="0.5" />
                  <ellipse cx="40" cy="89" rx="5" ry="2.5" fill="#334155" />

                  {/* Lead Wires */}
                  <line x1="33" y1="72" x2="33" y2="48" stroke={glowState > 0.4 ? "#fef08a" : "#94a3b8"} strokeWidth="1.2" strokeOpacity="0.8" />
                  <line x1="47" y1="72" x2="47" y2="48" stroke={glowState > 0.4 ? "#fef08a" : "#94a3b8"} strokeWidth="1.2" strokeOpacity="0.8" />

                  {/* Inner Glowing Filament Curve */}
                  <path
                    d="M 33 48 L 35 36 L 40 26 L 45 36 L 47 48"
                    fill="none"
                    stroke="url(#filamentGrad)"
                    strokeWidth={2 + glowState * 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#filamentGlowFilter)"
                    style={{
                      filter: `brightness(${filamentBrightness})`
                    }}
                  />

                  {/* Core Spark Element */}
                  <circle
                    cx="40"
                    cy="28"
                    r={3 + glowState * 3}
                    fill="#ffffff"
                    style={{
                      filter: `drop-shadow(0 0 ${4 + glowState * 10}px #fde047)`
                    }}
                  />
                </svg>
              </div>

              {/* STATE 2: IGNITED FUTURISTIC SPACESHIP ROCKET SVG */}
              <div
                ref={shipRef}
                className="absolute inset-0 transition-opacity duration-500 flex items-center justify-center pointer-events-none z-30"
                style={{
                  opacity: isSpaceshipMode ? 1 : 0,
                  filter: 'drop-shadow(0 0 25px rgba(244, 63, 94, 0.95)) drop-shadow(0 0 45px rgba(251, 191, 36, 0.8))'
                }}
              >
                {/* Ignition Blast Shockwave Ring */}
                {isSpaceshipMode && (
                  <div
                    className="absolute w-24 h-24 rounded-full border-2 border-amber-300 pointer-events-none"
                    style={{
                      animation: 'ignitionBlast 0.8s ease-out infinite'
                    }}
                  />
                )}

                <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="shipBodyGrad" x1="50" y1="5" x2="50" y2="85" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" />
                      <stop offset="0.4" stopColor="#f8fafc" />
                      <stop offset="0.8" stopColor="#e2e8f0" />
                      <stop offset="1" stopColor="#cbd5e1" />
                    </linearGradient>
                    <linearGradient id="shipWingGrad" x1="15" y1="50" x2="85" y2="90" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f43f5e" />
                      <stop offset="0.5" stopColor="#e11d48" />
                      <stop offset="1" stopColor="#9f1239" />
                    </linearGradient>
                    <linearGradient id="shipFlameGrad" x1="50" y1="85" x2="50" y2="125" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" />
                      <stop offset="0.25" stopColor="#fde047" />
                      <stop offset="0.65" stopColor="#f97316" />
                      <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                    <filter id="rocketFlameGlow">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Left Fin */}
                  <path d="M 30 55 L 10 82 C 8 85, 12 92, 20 90 L 33 80 Z" fill="url(#shipWingGrad)" stroke="#be123c" strokeWidth="0.8" />
                  
                  {/* Right Fin */}
                  <path d="M 70 55 L 90 82 C 92 85, 88 92, 80 90 L 67 80 Z" fill="url(#shipWingGrad)" stroke="#be123c" strokeWidth="0.8" />

                  {/* Center Fin Stabilizer */}
                  <path d="M 50 60 L 46 88 L 50 86 L 54 88 Z" fill="#9f1239" />

                  {/* Main Fuselage Rocket Body */}
                  <path
                    d="M 50 5 C 34 26, 30 52, 32 80 H 68 C 70 52, 66 26, 50 5 Z"
                    fill="url(#shipBodyGrad)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />

                  {/* Red Nose Cone Tip */}
                  <path d="M 50 5 C 43 16, 41 28, 41 34 H 59 C 59 28, 57 16, 50 5 Z" fill="#f43f5e" />

                  {/* Cockpit Window */}
                  <circle cx="50" cy="42" r="10" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.8" />
                  <circle cx="50" cy="42" r="7.5" fill="#38bdf8" />
                  <ellipse cx="47.5" cy="39.5" rx="3" ry="1.5" fill="#ffffff" opacity="0.85" />

                  {/* Rocket Engine Nozzle Collar */}
                  <path d="M 37 80 H 63 L 66 87 H 34 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />

                  {/* Main Engine Plasma Plume (Animated pulsing thruster flame) */}
                  <g style={{ transformOrigin: '50px 87px', animation: 'rocketFlamePulse 0.12s ease-in-out infinite alternate' }}>
                    <path
                      d="M 38 87 Q 50 128 50 135 Q 50 128 62 87 Q 50 105 38 87 Z"
                      fill="url(#shipFlameGrad)"
                      filter="url(#rocketFlameGlow)"
                    />
                    <path
                      d="M 43 87 Q 50 115 50 120 Q 50 115 57 87 Z"
                      fill="#ffffff"
                      filter="url(#rocketFlameGlow)"
                    />
                  </g>
                </svg>
              </div>

            </div>
          </div>

          {/* =====================================
              SEAMLESS BLENDED BRAINSTORMING TEAM WITH NATURAL CHARACTER ANIMATION
          ===================================== */}
          <div className="relative w-full max-w-xl flex items-center justify-center my-1">
            {/* Subtle Ambient Radial Aura behind team */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-rose-100/20 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* Container for the 5-Character Asynchronous Animated Scene */}
            <div className="relative w-full h-auto flex items-center justify-center overflow-hidden">
              
              {/* BASE ILLUSTRATION LAYER */}
              <img
                src={brainstormingImg}
                alt="PIERC Incubation Cell Student Founders Brainstorming"
                className="w-full h-auto object-contain mix-blend-multiply filter contrast-[1.03]"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  animation: 'naturalIdle 6s ease-in-out infinite'
                }}
              />

              {/* PERSON 1 (LEFT/FRONT) HEAD OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(8% 25%, 26% 25%, 26% 45%, 8% 45%)',
                  transformOrigin: '17% 44%',
                  animation: 'person1HeadListen 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 1 (LEFT/FRONT) HAND OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(18% 45%, 32% 45%, 32% 58%, 18% 58%)',
                  transformOrigin: '20% 50%',
                  animation: 'person1HandLaptop 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 2 (LEFT/BACK) HEAD OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(27% 16%, 40% 16%, 40% 32%, 27% 32%)',
                  transformOrigin: '34% 31%',
                  animation: 'person2HeadPoint 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 2 (LEFT/BACK) ARM/POINT OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(31% 32%, 44% 32%, 44% 47%, 31% 47%)',
                  transformOrigin: '33% 36%',
                  animation: 'person2ArmPoint 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 3 (CENTER) HEAD OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(47% 17%, 59% 17%, 59% 33%, 47% 33%)',
                  transformOrigin: '53% 32%',
                  animation: 'person3HeadTalk 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 3 (CENTER) ARM/STYLUS OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(43% 33%, 62% 33%, 62% 46%, 43% 46%)',
                  transformOrigin: '51% 36%',
                  animation: 'person3ArmGesture 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 4 (RIGHT/BACK) HEAD OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(66% 18%, 79% 18%, 79% 33%, 66% 33%)',
                  transformOrigin: '72% 32%',
                  animation: 'person4HeadRespond 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 4 (RIGHT/BACK) ARM GESTURE OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(59% 31%, 70% 31%, 70% 44%, 59% 44%)',
                  transformOrigin: '68% 36%',
                  animation: 'person4ArmGesture 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 5 (RIGHT/FRONT) HEAD OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(76% 26%, 89% 26%, 89% 42%, 76% 42%)',
                  transformOrigin: '82% 41%',
                  animation: 'person5HeadWatch 12s ease-in-out infinite'
                }}
              />

              {/* PERSON 5 (RIGHT/FRONT) HAND OVERLAY */}
              <img
                src={brainstormingImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply filter contrast-[1.03] pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 96%)',
                  clipPath: 'polygon(67% 43%, 82% 43%, 82% 58%, 67% 58%)',
                  transformOrigin: '80% 48%',
                  animation: 'person5HandNotes 12s ease-in-out infinite'
                }}
              />

            </div>
          </div>
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

