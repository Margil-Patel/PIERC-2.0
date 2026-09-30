import React, { useState } from 'react';
import { fourPillars } from '../../data/ecosystemData';

export default function PillarsSection({ onOpenIncubationModal }) {
  const [expandedPillar, setExpandedPillar] = useState(null);

  return (
    <section id="ecosystem-pillars" className="w-full bg-surface py-20 lg:py-28 border-b border-hairline-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Narrative */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
            <span className="reveal-eyebrow-line bg-primary" />
            <span>About PIERC</span>
          </div>
          <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
            An ecosystem engineered to propel bold ideas from campus to market.
          </h2>
          <p className="reveal-desc font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Founded in 2013 as the Entrepreneurship Development Cell (EDC) and incorporated in 2015 as a dedicated Section 8 non-profit incubator, PIERC exists with an unapologetic university mandate: <span className="text-on-surface font-semibold text-primary">enabling 5% of Parul University students to choose entrepreneurial careers as job creators</span>, not mere job seekers.
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {fourPillars.map((pillar, idx) => {
            const isExpanded = expandedPillar === idx;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[32px]">{pillar.icon}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-label-code text-xs text-outline uppercase font-semibold">
                      Pillar {pillar.number}
                    </span>
                    <h3 className="font-headline-md text-2xl font-bold text-on-surface">
                      {pillar.name}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bullet details */}
                  <ul className="space-y-2 pt-2 border-t border-hairline-light/60">
                    {pillar.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs text-on-surface font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onOpenIncubationModal(pillar.name.toLowerCase())}
                    className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-between font-label-caps text-xs uppercase tracking-wider font-semibold group-hover:bg-primary-container group-hover:text-on-primary"
                  >
                    <span>{pillar.tagline}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
