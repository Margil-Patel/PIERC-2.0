import React from 'react';

export default function CtaSection({ onOpenIncubationModal, onOpenMentorModal }) {
  return (
    <section className="w-full bg-graphite-deep text-canvas-light py-20 lg:py-28 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 via-transparent to-electric-glow/15 pointer-events-none"></div>
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="reveal-eyebrow inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-graphite-surface border border-graphite-border text-electric-glow">
            <span className="w-2 h-2 rounded-full bg-electric-glow animate-pulse"></span>
            <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">
              Shape the Future of Technology
            </span>
          </div>

          <div>
            <h2 className="reveal-cta-words font-display-hero text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-canvas-light leading-none">
              <span className="reveal-cta-word">BUILD</span>
              <span className="reveal-cta-word">WHAT'S</span>
              <span className="reveal-cta-word text-transparent bg-clip-text bg-gradient-to-r from-electric-glow to-primary-container">NEXT.</span>
            </h2>
            <p className="reveal-heading text-xl sm:text-2xl text-canvas-light/90 font-medium mt-4 tracking-tight">
              Your idea could be the next breakthrough venture.
            </p>
          </div>

          <p className="reveal-desc font-body-lg text-base sm:text-lg text-outline-variant max-w-2xl mx-auto leading-relaxed">
            Whether you have an early napkin concept, a laboratory patent, or an active operating startup seeking institutional scale, PIERC provides the capital, lab infrastructure, and mentorship network to succeed.
          </p>

          {/* Dual Pathway CTAs */}
          <div className="reveal-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenIncubationModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-primary-container hover:bg-primary text-on-primary font-body-md text-base font-bold transition-all shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Apply for Incubation →
            </button>
            <button
              onClick={() => onOpenMentorModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-graphite-surface border border-graphite-border hover:bg-graphite-border text-canvas-light font-body-md text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              Join as Mentor or Angel Investor →
            </button>
          </div>

          {/* Feature Badges */}
          <div className="reveal-stagger pt-8 flex items-center justify-center gap-6 sm:gap-8 font-label-code text-xs text-outline-variant flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-glow"></span>
              Non-dilutive Seed Grants Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-glow"></span>
              Full IP &amp; Patent Ownership Retained
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-glow"></span>
              DST &amp; BIRAC Supported
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
