import React, { useState } from 'react';
import { fourPillars } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function PillarsSection({ onOpenIncubationModal }) {
  const [expandedPillar, setExpandedPillar] = useState(null);

  return (
    <section id="ecosystem-pillars" className="w-full bg-surface py-12 lg:py-18 border-b border-hairline-light select-none overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Narrative */}
        <div className="max-w-2xl mb-10 space-y-2.5">
          <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-[11px] flex items-center gap-2.5">
            <span className="reveal-eyebrow-line bg-primary" />
            <span>About PIERC</span>
          </div>
          <h2 className="reveal-heading font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
            An ecosystem engineered to propel bold ideas from campus to market.
          </h2>
          <p className="reveal-desc font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Founded in 2013 as the Entrepreneurship Development Cell (EDC) and incorporated in 2015 as a dedicated Section 8 non-profit incubator, PIERC exists with an unapologetic university mandate: <span className="text-on-surface font-semibold text-primary">enabling 5% of Parul University students to choose entrepreneurial careers as job creators</span>, not mere job seekers.
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {fourPillars.map((pillar, idx) => {
            const isExpanded = expandedPillar === idx;
            return (
              <ParallaxCard
                key={idx}
                index={idx}
                className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-hairline-light shadow-2xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-label-code text-[11px] text-outline uppercase font-semibold">
                      Pillar {pillar.number}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">
                      {pillar.name}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bullet details */}
                  <ul className="space-y-1.5 pt-2 border-t border-hairline-light/60">
                    {pillar.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs text-on-surface font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5">
                  <button
                    onClick={() => onOpenIncubationModal(pillar.name.toLowerCase())}
                    className="w-full py-2 px-3.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-between font-label-caps text-[11px] uppercase tracking-wider font-semibold group-hover:bg-primary-container group-hover:text-on-primary"
                  >
                    <span>{pillar.tagline}</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </ParallaxCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
