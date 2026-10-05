import React from 'react';
import piercWhiteLogo from '../../assets/pierc-white-logo.svg';
import heroBgVideo from '../../assets/hero-bg-video.mp4';

export default function VideoBannerSection() {
  const handleScrollToHero = () => {
    const el = document.getElementById('main-hero-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[82vh] min-h-[500px] max-h-[760px] overflow-hidden bg-slate-950 flex flex-col items-center justify-center isolation-isolate">
      {/* 1. Background Video Reel */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-[0.9] contrast-[1.1] pointer-events-none"
      >
        <source src={heroBgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Cinematic Gradient & Aura Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-rose-500/20 via-pink-400/20 to-amber-300/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* 3. Centered Flashing White PIERC Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center group cursor-pointer" onClick={handleScrollToHero}>
        
        {/* Pulsing Backlight aura */}
        <div className="absolute w-48 sm:w-64 h-20 sm:h-32 bg-rose-500/30 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125" />

        {/* Flashing White Logo Image */}
        <img
          src={piercWhiteLogo}
          alt="Parul Innovation & Entrepreneurship Research Centre - PIERC"
          className="relative w-auto h-16 sm:h-22 md:h-28 max-w-[70vw] object-contain transition-all duration-500"
          style={{
            animation: 'piercLogoFlash 3.2s ease-in-out infinite'
          }}
        />

        {/* Subtitle tag */}
        <div className="mt-4 flex items-center gap-3">
          <span className="w-6 sm:w-8 h-[1px] bg-rose-400/80" />
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-rose-200 uppercase drop-shadow">
            Parul University Incubation Ecosystem
          </span>
          <span className="w-6 sm:w-8 h-[1px] bg-rose-400/80" />
        </div>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 z-10 flex flex-col items-center">
        <button
          onClick={handleScrollToHero}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white/90 text-xs font-mono font-medium uppercase tracking-widest backdrop-blur-md hover:border-rose-400 hover:text-white transition-all duration-300 group shadow-lg cursor-pointer"
        >
          <span>Scroll To Explore</span>
          <span className="text-rose-400 transform group-hover:translate-y-1 transition-transform duration-300">↓</span>
        </button>
      </div>

      {/* Local keyframes for logo flashing */}
      <style>{`
        @keyframes piercLogoFlash {
          0%, 100% {
            opacity: 0.82;
            filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 32px rgba(244, 63, 94, 0.35));
            transform: scale(1);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 45px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 75px rgba(244, 63, 94, 0.8)) brightness(1.25);
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
