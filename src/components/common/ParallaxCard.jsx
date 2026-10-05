import React, { useRef, useState, useEffect } from 'react';

/**
 * Premium Scroll Parallax Card Wrapper
 * Creates depth via staggered scroll speeds, subtle 3D perspective, horizontal shift, and center zoom.
 * Fully responsive, isolated to transforms, and respects prefers-reduced-motion.
 */
const DEPTH_SPEEDS = [0.15, 0.25, 0.18, 0.30, 0.20, 0.22];
const HORIZONTAL_DIRECTIONS = [-1, 1, -0.75, 0.75, -0.5, 0.5];

export default function ParallaxCard({
  children,
  index = 0,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
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

      // Card center position relative to viewport center normalized [-1.5, 1.5]
      const cardCenterY = rect.top + rect.height / 2;
      const viewportCenterY = windowHeight / 2;
      const distFromCenter = (cardCenterY - viewportCenterY) / (windowHeight / 2);
      const clampedDist = Math.max(-1.5, Math.min(1.5, distFromCenter));

      // Responsive adjustments
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const speedMultiplier = isMobile ? 0.25 : isTablet ? 0.6 : 1.0;

      const baseSpeed = DEPTH_SPEEDS[index % DEPTH_SPEEDS.length] * speedMultiplier;
      const hDir = HORIZONTAL_DIRECTIONS[index % HORIZONTAL_DIRECTIONS.length];

      // Vertical Parallax (Max 20-35px shift)
      const translateY = -clampedDist * baseSpeed * 75;

      // Dynamic Scale: 0.96 (below) -> 1.02 (center) -> 0.98 (above)
      let scale = 1.0;
      if (clampedDist > 0) {
        // Approaching center from bottom: 0.96 -> 1.02
        scale = 0.96 + (1 - Math.min(1, clampedDist)) * 0.06;
      } else {
        // Passing center towards top: 1.02 -> 0.98
        scale = 1.02 - Math.min(1, Math.abs(clampedDist)) * 0.04;
      }

      // Opacity: 0.75 (far below) -> 1.0 (in viewport)
      let opacity = 1.0;
      if (clampedDist > 0.4) {
        opacity = Math.max(0.75, 1 - (clampedDist - 0.4) * 0.45);
      }

      // Horizontal offset (disabled on mobile)
      const translateX = isMobile ? 0 : hDir * clampedDist * 9 * speedMultiplier;

      // Subtle 3D Perspective Tilt (disabled on mobile, max 1.5deg)
      const rotateX = isMobile ? 0 : Math.max(-1.5, Math.min(1.5, clampedDist * 1.5));

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

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        ...(isHovered
          ? {
              transform: 'perspective(1000px) translate3d(0px, -4px, 0px) scale(1.03) rotateX(0deg)',
              opacity: 1,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
              filter: 'brightness(1.03)',
              transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 30,
            }
          : parallaxTransform),
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
