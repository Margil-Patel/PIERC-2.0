import React, { useRef, useState, useEffect } from 'react';

/**
 * Premium Interactive 3D Parallax & Spotlight Card Wrapper
 * Features dynamic mouse 3D tilt, smooth spring physics, interactive cursor spotlight flare,
 * multi-layer depth elevation, responsive scroll parallax, and full accessibility support.
 */
const DEPTH_SPEEDS = [0.15, 0.25, 0.18, 0.30, 0.20, 0.22];
const HORIZONTAL_DIRECTIONS = [-1, 1, -0.75, 0.75, -0.5, 0.5];

export default function ParallaxCard({
  children,
  index = 0,
  className = '',
  contentClassName = '',
  style = {},
  onClick,
  maxTilt = 12,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [parallaxTransform, setParallaxTransform] = useState({});

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animFrameId;

    const updateParallax = () => {
      if (!cardRef.current || isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const cardCenterY = rect.top + rect.height / 2;
      const viewportCenterY = windowHeight / 2;
      const distFromCenter = (cardCenterY - viewportCenterY) / (windowHeight / 2);
      const clampedDist = Math.max(-1.5, Math.min(1.5, distFromCenter));

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const speedMultiplier = isMobile ? 0.25 : isTablet ? 0.6 : 1.0;

      const baseSpeed = DEPTH_SPEEDS[index % DEPTH_SPEEDS.length] * speedMultiplier;
      const hDir = HORIZONTAL_DIRECTIONS[index % HORIZONTAL_DIRECTIONS.length];

      // Vertical Parallax (amplified for distinct multi-layer depth)
      const translateY = -clampedDist * baseSpeed * 105;

      // Dynamic Scale: 0.96 (below) -> 1.025 (center) -> 0.98 (above)
      let scale = 1.0;
      if (clampedDist > 0) {
        scale = 0.96 + (1 - Math.min(1, clampedDist)) * 0.065;
      } else {
        scale = 1.025 - Math.min(1, Math.abs(clampedDist)) * 0.045;
      }

      // Opacity: 0.85 (far below) -> 1.0 (in viewport)
      let opacity = 1.0;
      if (clampedDist > 0.5) {
        opacity = Math.max(0.85, 1 - (clampedDist - 0.5) * 0.3);
      }

      const translateX = isMobile ? 0 : hDir * clampedDist * 16 * speedMultiplier;
      const rotateX = isMobile ? 0 : Math.max(-2, Math.min(2, clampedDist * 2));

      setParallaxTransform({
        transform: `perspective(1000px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg)`,
        opacity: opacity.toFixed(3),
        willChange: 'transform, opacity',
        transition: 'transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.15s ease-out',
      });
    };

    const onScroll = () => {
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(() => {
          updateParallax();
          animFrameId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [index, isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const effectiveTilt = isTouch ? 2 : maxTilt;

    setMousePos({ x: pctX, y: pctY });
    setTilt({
      rotateX: -(normY * effectiveTilt),
      rotateY: normX * effectiveTilt,
    });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const hoverTransformStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translate3d(0px, -8px, 24px) scale(1.03)`,
    opacity: 1,
    boxShadow:
      '0 25px 35px -10px rgba(225, 29, 72, 0.22), 0 12px 20px -6px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(225, 29, 72, 0.35)',
    transition: 'transform 0.08s ease-out, box-shadow 0.3s ease, opacity 0.3s ease',
    zIndex: 30,
  };

  const resetTransformStyle = {
    ...parallaxTransform,
    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out, box-shadow 0.35s ease',
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        ...(isHovered ? hoverTransformStyle : resetTransformStyle),
        transformStyle: 'preserve-3d',
      }}
      className={`group relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, rgba(225, 29, 72, 0.18), rgba(255, 255, 255, 0) 65%)`,
        }}
      />

      {/* Dynamic Cursor Border Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(225, 29, 72, 0.28), transparent 70%)`,
        }}
      />

      {/* Card Content Layer */}
      <div
        className={`relative z-20 w-full h-full ${
          contentClassName || (className.includes('justify-between') ? 'flex flex-col justify-between' : '')
        }`}
      >
        {children}
      </div>
    </div>
  );
}

