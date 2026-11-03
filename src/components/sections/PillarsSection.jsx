import React, { useState } from 'react';
import { fourPillars } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';
import { ChevronDown } from 'lucide-react';

export default function PillarsSection({ onOpenIncubationModal }) {
  // Mobile accordion state: allows multiple pillars to be expanded simultaneously
  const [expandedIndices, setExpandedIndices] = useState([]);

  const togglePillar = (idx) => {
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="ecosystem-pillars" className="w-full bg-surface py-12 lg:py-18 border-b border-hairline-light select-none overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Narrative */}
        <div className="max-w-2xl mb-8 md:mb-10 space-y-2.5">
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

        {/* ==================================================================
            MOBILE ACCORDION LIST (< 768px)
            ================================================================== */}
        <div className="flex flex-col gap-3 md:hidden">
          {fourPillars.map((pillar, idx) => {
            const isExpanded = expandedIndices.includes(idx);

            return (
              <div
                key={pillar.number}
                className={`w-full rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-primary/40 shadow-[0_4px_16px_rgba(225,29,72,0.08)]'
                    : 'border-hairline-light shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-pink-200'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  id={`pillar-header-${idx}`}
                  onClick={() => togglePillar(idx)}
                  aria-expanded={isExpanded}
                  aria-controls={`pillar-panel-${idx}`}
                  className="w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Pillar Icon inside Soft Pink Rounded Container */}
                    <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-2xs">
                      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                        {pillar.icon}
                      </span>
                    </div>

                    {/* Pillar Number & Title */}
                    <div className="min-w-0">
                      <span className="font-label-code text-[11px] text-outline uppercase font-semibold tracking-wider block">
                        Pillar {pillar.number}
                      </span>
                      <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface leading-tight mt-0.5 truncate">
                        {pillar.name}
                      </h3>
                    </div>
                  </div>

                  {/* Expand/Collapse Chevron inside Circular Section (Glows on Click / Active) */}
                  <div className="ml-3 shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'bg-primary text-white border border-primary shadow-[0_0_16px_rgba(225,29,72,0.55),0_0_28px_rgba(225,29,72,0.25)] ring-4 ring-primary/20 scale-105'
                          : 'bg-surface-container text-primary border border-hairline-light/90 shadow-2xs group-hover:border-primary/40 group-active:scale-90 group-active:shadow-[0_0_14px_rgba(225,29,72,0.45)]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-white' : 'text-primary'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>

                {/* Smooth Expandable Content Panel */}
                <div
                  id={`pillar-panel-${idx}`}
                  role="region"
                  aria-labelledby={`pillar-header-${idx}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-hairline-light/80 pt-3.5 px-4 pb-4 space-y-3.5">
                      {/* Full Pillar Description */}
                      <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Supporting Bullet Points with Vibrant Pink Dots */}
                      <ul className="space-y-2 pt-1">
                        {pillar.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs text-on-surface font-medium leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Existing CTA Button with Arrow */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenIncubationModal && onOpenIncubationModal(pillar.name.toLowerCase())}
                          className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-between font-label-caps text-[11px] uppercase tracking-wider font-semibold active:scale-[0.99] border border-pink-200/50"
                        >
                          <span>{pillar.tagline}</span>
                          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ==================================================================
            DESKTOP/TABLET FOUR PILLARS GRID (>= 768px) (PRESERVED UNCHANGED)
            ================================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {fourPillars.map((pillar, idx) => (
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
                  type="button"
                  onClick={() => onOpenIncubationModal && onOpenIncubationModal(pillar.name.toLowerCase())}
                  className="w-full py-2 px-3.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-between font-label-caps text-[11px] uppercase tracking-wider font-semibold group-hover:bg-primary-container group-hover:text-on-primary"
                >
                  <span>{pillar.tagline}</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </ParallaxCard>
          ))}
        </div>

      </div>
    </section>
  );
}
