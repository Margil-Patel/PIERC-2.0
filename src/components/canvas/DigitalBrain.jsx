import React, { useState, useEffect, useRef } from 'react';
import brainAsset from '../../assets/hero_lowpoly_brain.jpg';

export default function DigitalBrain() {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse Parallax (subtle 6-10px response)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({
      x: nx * 8,
      y: ny * 6,
    });
  };

  // Canvas-based interactive animated neural sparks & ambient particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Pulsing Synaptic Hotspots - Refined Micro-Sparks
    const hotspots = [
      { rx: 0.38, ry: 0.28, baseR: 3.2, color: '#ec4899', speed: 0.04, phase: 0 },
      { rx: 0.52, ry: 0.22, baseR: 3.5, color: '#0f172a', speed: 0.03, phase: 1.2 },
      { rx: 0.65, ry: 0.26, baseR: 3.2, color: '#ec4899', speed: 0.05, phase: 2.5 },
      { rx: 0.32, ry: 0.38, baseR: 3.0, color: '#64748b', speed: 0.035, phase: 0.8 },
      { rx: 0.46, ry: 0.35, baseR: 4.0, color: '#0f172a', speed: 0.045, phase: 3.1 },
      { rx: 0.60, ry: 0.36, baseR: 3.4, color: '#ec4899', speed: 0.03, phase: 1.7 },
      { rx: 0.74, ry: 0.38, baseR: 3.0, color: '#64748b', speed: 0.04, phase: 2.1 },
      { rx: 0.42, ry: 0.48, baseR: 3.2, color: '#ec4899', speed: 0.038, phase: 0.5 },
      { rx: 0.55, ry: 0.46, baseR: 3.8, color: '#0f172a', speed: 0.042, phase: 2.8 },
      { rx: 0.68, ry: 0.48, baseR: 3.0, color: '#ec4899', speed: 0.032, phase: 1.4 },
      { rx: 0.58, ry: 0.60, baseR: 3.4, color: '#64748b', speed: 0.04, phase: 0.9 },
    ];

    // Floating Ambient Dust Particles in Subtle Neutral & Pink
    const particles = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.7 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.15 + Math.random() * 0.4,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? 'rgba(236, 72, 153,' : 'rgba(100, 116, 139,',
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.phase) * 0.15);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.shadowColor = p.color.includes('236') ? '#ec4899' : '#94a3b8';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Pulsing Synaptic Hotspots
      hotspots.forEach((h) => {
        const hx = h.rx * width;
        const hy = h.ry * height;
        h.phase += h.speed;

        const pulseScale = 1 + Math.sin(h.phase) * 0.4;
        const radius = h.baseR * pulseScale;
        const glowRadius = radius * 3.0;

        const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, glowRadius);
        glow.addColorStop(0, h.color === '#ec4899' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(15, 23, 42, 0.2)');
        glow.addColorStop(0.5, 'rgba(226, 232, 240, 0.1)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(hx, hy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hx, hy, radius, 0, Math.PI * 2);
        ctx.fillStyle = h.color;
        ctx.shadowColor = h.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] xl:min-h-[680px] relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-visible"
    >
      {/* 1. Behind-the-Brain Volumetric Radial Cyan Aura */}
      {/* 1. Behind-the-Brain Volumetric Radial Soft Pink Aura */}
      <div 
        className="absolute w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-pink-300/40 via-rose-300/25 to-transparent blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
        }}
      />

      {/* 2. Floating 3D Low-Poly Digital Brain Visual Asset */}
      <div
        className="relative z-10 w-full max-w-[560px] lg:max-w-[640px] xl:max-w-[680px] aspect-square transition-transform duration-500 ease-out animate-soft-pulse"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
        }}
      >
        <img
          src={brainAsset}
          alt="PIERC 3D Low-Poly Digital Brain"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(236,72,153,0.22)]"
          style={{
            maskImage: 'radial-gradient(circle at 50% 50%, black 58%, rgba(0,0,0,0.85) 75%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 58%, rgba(0,0,0,0.85) 75%, transparent 95%)',
          }}
        />

        {/* 3. Interactive Animated Synaptic Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />
      </div>

      {/* 4. Ambient Perspective Network Floor Highlights */}
      <div className="absolute -bottom-6 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-30" />
    </div>
  );
}
