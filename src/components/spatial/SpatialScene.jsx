import React, { useEffect, useRef, useState } from 'react';
import { useSpatial3D } from './Spatial3DContainer';

export function SpatialScene({ id, children, className = '', index = 0 }) {
  const containerRef = useRef(null);
  const { registerScene, unregisterScene, smoothedScrollY, viewportHeight, isMobile, isReducedMotion } =
    useSpatial3D();

  const [transforms, setTransforms] = useState({
    translateZ: 0,
    translateY: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    opacity: 1,
    blur: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      registerScene(id || `scene-${index}`, containerRef.current);
    }
    return () => {
      unregisterScene(id || `scene-${index}`);
    };
  }, [id, index, registerScene, unregisterScene]);

  // Recalculate 3D camera transforms on every smoothed scroll frame with height-aware focus boundaries
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) {
      setTransforms({
        translateZ: 0,
        translateY: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        blur: 0,
      });
      return;
    }

    const node = containerRef.current;
    const rect = node.getBoundingClientRect();
    const vh = viewportHeight || window.innerHeight || 800;

    const top = rect.top;
    const bottom = rect.bottom;

    // Focus Thresholds:
    // Section is in focus when its top is below upper margin and bottom is above lower margin.
    const entryThreshold = vh * 0.85; // Top threshold for entry transition
    const exitThreshold = vh * 0.15;  // Bottom threshold for exit transition

    const transitionRange = vh * 0.65; // Distance over which transition occurs

    const maxTranslateZIncoming = isMobile ? -250 : -650;
    const maxTranslateZOutgoing = isMobile ? -180 : -400;
    const minScale = isMobile ? 0.96 : 0.93;
    const maxBlurIncoming = isMobile ? 4 : 10;
    const maxBlurOutgoing = isMobile ? 3 : 8;
    const maxRotateX = isMobile ? 0.6 : 2.0;
    const maxRotateY = isMobile ? 0.4 : 1.2;

    let tz = 0;
    let ty = 0;
    let sc = 1;
    let rx = 0;
    let ry = 0;
    let op = 1;
    let bl = 0;

    if (top > entryThreshold - transitionRange) {
      // SECTION IS ENTERING FROM BELOW (Top is coming up from bottom of viewport)
      const distFromFocus = top - (entryThreshold - transitionRange);
      const rawRatio = Math.min(1, Math.max(0, distFromFocus / transitionRange));

      if (rawRatio <= 0.05) {
        // Fully focused
        tz = 0;
        sc = 1;
        op = 1;
        bl = 0;
        rx = 0;
        ry = 0;
      } else {
        const ease = rawRatio * rawRatio * (3 - 2 * rawRatio);
        tz = maxTranslateZIncoming * ease;
        sc = 1 - (1 - minScale) * ease;
        op = Math.max(0, 1 - ease * 1.05);
        bl = maxBlurIncoming * ease;
        rx = maxRotateX * ease;
        ry = -maxRotateY * ease;
        ty = 35 * ease;
      }
    } else if (bottom < exitThreshold + transitionRange) {
      // SECTION IS EXITING TO TOP (Bottom is leaving top of viewport)
      const distFromFocus = exitThreshold + transitionRange - bottom;
      const rawRatio = Math.min(1, Math.max(0, distFromFocus / transitionRange));

      if (rawRatio <= 0.05) {
        // Fully focused
        tz = 0;
        sc = 1;
        op = 1;
        bl = 0;
        rx = 0;
        ry = 0;
      } else {
        const ease = rawRatio * rawRatio * (3 - 2 * rawRatio);
        tz = maxTranslateZOutgoing * ease;
        sc = 1 - (1 - minScale) * ease;
        op = Math.max(0, 1 - ease * 1.05);
        bl = maxBlurOutgoing * ease;
        rx = -maxRotateX * ease;
        ry = maxRotateY * ease;
        ty = -25 * ease;
      }
    } else {
      // SECTION IS IN ACTIVE FOCUS ZONE (User reading / scrolling within section)
      tz = 0;
      ty = 0;
      sc = 1;
      rx = 0;
      ry = 0;
      op = 1;
      bl = 0;
    }

    setTransforms({
      translateZ: Math.round(tz * 10) / 10,
      translateY: Math.round(ty * 10) / 10,
      scale: Math.round(sc * 1000) / 1000,
      rotateX: Math.round(rx * 100) / 100,
      rotateY: Math.round(ry * 100) / 100,
      opacity: Math.round(op * 100) / 100,
      blur: Math.round(bl * 10) / 10,
    });
  }, [smoothedScrollY, viewportHeight, isMobile, isReducedMotion]);

  const transformStyleString = isReducedMotion
    ? 'none'
    : `translate3d(0px, ${transforms.translateY}px, ${transforms.translateZ}px) scale(${transforms.scale}) rotateX(${transforms.rotateX}deg) rotateY(${transforms.rotateY}deg)`;

  const filterStyleString = isReducedMotion || transforms.blur <= 0.2 ? 'none' : `blur(${transforms.blur}px)`;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`spatial-scene-wrapper relative w-full ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform, filter, opacity',
        transform: transformStyleString,
        filter: filterStyleString,
        opacity: transforms.opacity,
        transition: 'transform 0.05s linear, filter 0.05s linear, opacity 0.05s linear',
      }}
    >
      {/* Subtle Spatial Lighting Highlight during section entry/exit */}
      {!isReducedMotion && transforms.opacity < 0.98 && transforms.opacity > 0.05 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-20"
          style={{
            background:
              transforms.translateZ < -150
                ? 'radial-gradient(ellipse at 50% 50%, rgba(244, 63, 94, 0.06) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(251, 113, 133, 0.04) 0%, transparent 70%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

export default SpatialScene;
