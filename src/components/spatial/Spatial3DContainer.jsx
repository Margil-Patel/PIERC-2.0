import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Spatial 3D Context for sharing camera & scroll progress state with child scenes
const Spatial3DContext = createContext({
  scrollY: 0,
  smoothedScrollY: 0,
  viewportHeight: 800,
  isMobile: false,
  isReducedMotion: false,
  activeSceneIndex: 0,
  registerScene: () => {},
  unregisterScene: () => {},
});

export const useSpatial3D = () => useContext(Spatial3DContext);

export function Spatial3DContainer({ children, perspective = 1400 }) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const scenesRef = useRef([]);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafIdRef = useRef(null);

  // Check preferences and screen dimensions
  useEffect(() => {
    const checkMedia = () => {
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(mobile);
      setIsReducedMotion(reduced);
      setViewportHeight(window.innerHeight);
    };

    checkMedia();
    window.addEventListener('resize', checkMedia, { passive: true });
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  // Smooth Scroll Loop (Lerp for cinematic camera movement)
  useEffect(() => {
    let lastTime = performance.now();

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY || window.pageYOffset || 0;
      setScrollY(targetScrollRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    targetScrollRef.current = window.scrollY || window.pageYOffset || 0;
    currentScrollRef.current = targetScrollRef.current;

    const renderLoop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lerp factor: smooth interpolation without lagging far behind scroll
      const lerpFactor = isMobile || isReducedMotion ? 0.25 : 0.14;
      const diff = targetScrollRef.current - currentScrollRef.current;

      if (Math.abs(diff) > 0.1) {
        currentScrollRef.current += diff * lerpFactor;
      } else {
        currentScrollRef.current = targetScrollRef.current;
      }

      // Determine active scene based on current scroll position
      if (scenesRef.current.length > 0) {
        const vh = window.innerHeight || 800;
        const center = currentScrollRef.current + vh / 2;
        let closestIdx = 0;
        let minDistance = Infinity;

        scenesRef.current.forEach((scene, idx) => {
          if (!scene.node) return;
          const rect = scene.node.getBoundingClientRect();
          const sceneCenter = rect.top + currentScrollRef.current + rect.height / 2;
          const dist = Math.abs(center - sceneCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        setActiveSceneIndex(closestIdx);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isMobile, isReducedMotion]);

  const registerScene = (id, node) => {
    if (!node) return;
    const existing = scenesRef.current.find((s) => s.id === id);
    if (existing) {
      existing.node = node;
    } else {
      scenesRef.current.push({ id, node });
    }
  };

  const unregisterScene = (id) => {
    scenesRef.current = scenesRef.current.filter((s) => s.id !== id);
  };

  // Parallax shifts for background depth layers
  const backgroundY1 = currentScrollRef.current * 0.05; // Far gradient
  const backgroundY2 = currentScrollRef.current * 0.12; // 3D Grid
  const backgroundY3 = currentScrollRef.current * 0.22; // Ambient particles
  const backgroundY4 = currentScrollRef.current * 0.35; // Soft glow shapes

  return (
    <Spatial3DContext.Provider
      value={{
        scrollY,
        smoothedScrollY: currentScrollRef.current,
        viewportHeight,
        isMobile,
        isReducedMotion,
        activeSceneIndex,
        registerScene,
        unregisterScene,
      }}
    >
      <div
        className="spatial-environment relative w-full overflow-hidden"
        style={{
          perspective: isReducedMotion ? 'none' : isMobile ? '1000px' : `${perspective}px`,
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* =========================================================
            BACKGROUND DEPTH SYSTEM (5 PARALLAX LAYERS)
        ========================================================= */}
        {!isReducedMotion && (
          <div className="spatial-background-system fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* LAYER 1: Far Background Dynamic Gradient */}
            <div
              className="absolute inset-0 transition-colors duration-1000"
              style={{
                transform: `translate3d(0, ${-backgroundY1}px, -600px) scale(1.4)`,
                background:
                  activeSceneIndex === 0
                    ? 'radial-gradient(ellipse at 70% 30%, rgba(254, 205, 211, 0.35), rgba(255, 255, 255, 0.95) 70%)'
                    : activeSceneIndex === 3 // Journey Space
                    ? 'radial-gradient(ellipse at 50% 40%, rgba(253, 242, 248, 0.8), rgba(248, 250, 252, 0.98) 70%)'
                    : activeSceneIndex === 5 // FabLab
                    ? 'radial-gradient(ellipse at 40% 60%, rgba(238, 242, 255, 0.6), rgba(255, 255, 255, 0.98) 70%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(255, 241, 242, 0.4), rgba(255, 255, 255, 0.98) 80%)',
              }}
            />

            {/* LAYER 2: Subtle 3D Perspective Depth Grid */}
            <div
              className="absolute inset-[-20%] opacity-25"
              style={{
                transform: `translate3d(0, ${-backgroundY2}px, -400px) rotateX(15deg) scale(1.3)`,
                backgroundImage: `
                  linear-gradient(to right, rgba(244, 63, 94, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(244, 63, 94, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)',
              }}
            />

            {/* LAYER 3: Ambient Floating Particles */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                transform: `translate3d(0, ${-backgroundY3}px, -250px) scale(1.2)`,
              }}
            >
              <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-rose-400 blur-[1px] animate-pulse" />
              <div className="absolute top-[35%] right-[15%] w-3 h-3 rounded-full bg-amber-400 blur-[2px]" />
              <div className="absolute top-[60%] left-[10%] w-2.5 h-2.5 rounded-full bg-pink-400 blur-[1px]" />
              <div className="absolute top-[80%] right-[25%] w-2 h-2 rounded-full bg-rose-500 blur-[1px]" />
            </div>

            {/* LAYER 4: Soft Decorative Glow Orbs */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translate3d(0, ${-backgroundY4}px, -120px)`,
              }}
            >
              <div
                className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] transition-opacity duration-1000"
                style={{
                  background: 'rgba(244, 63, 94, 0.12)',
                  opacity: activeSceneIndex % 2 === 0 ? 0.8 : 0.3,
                }}
              />
              <div
                className="absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full blur-[90px] transition-opacity duration-1000"
                style={{
                  background: 'rgba(251, 113, 133, 0.1)',
                  opacity: activeSceneIndex % 2 === 1 ? 0.8 : 0.3,
                }}
              />
            </div>
          </div>
        )}

        {/* LAYER 5: Main Content Scenes Plane */}
        <div className="spatial-content-plane relative z-10 w-full">{children}</div>
      </div>
    </Spatial3DContext.Provider>
  );
}

export default Spatial3DContainer;
