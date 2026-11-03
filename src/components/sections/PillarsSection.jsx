import React, { useState } from 'react';
import { fourPillars } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';
import { ChevronDown } from 'lucide-react';

export default function PillarsSection({ onOpenIncubationModal }) {
  // Mobile accordion state: initially all collapsed, only one expanded at a time
  const [expandedIdx, setExpandedIdx] = useState(null);

  const togglePillar = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % fourPillars.length;
      document.getElementById(`pillar-trigger-${nextIdx}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + fourPillars.length) % fourPillars.length;
      document.getElementById(`pillar-trigger-${prevIdx}`)?.focus();
    }
  };

  return (
    <section
      id="ecosystem-pillars"
      className="w-full bg-surface py-12 lg:py-16 border-b border-hairline-light select-none overflow-hidden"
    >
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
        <div className="flex flex-col gap-3.5 md:hidden" role="presentation">
          {fourPillars.map((pillar, idx) => {
            const isExpanded = expandedIdx === idx;

            return (
              <div
                key={pillar.number || idx}
                className={`rounded-[20px] bg-white transition-all duration-300 ${
                  isExpanded
                    ? 'border-2 border-primary/40 shadow-md shadow-pink-100/70'
                    : 'border border-pink-100/90 shadow-2xs hover:border-pink-200'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  id={`pillar-trigger-${idx}`}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`pillar-panel-${idx}`}
                  onClick={() => togglePillar(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="flex items-center w-full p-3.5 sm:p-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[20px] transition-colors"
                >
                  {/* Left: Pillar Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] border border-pink-100/80 flex items-center justify-center text-primary shrink-0 mr-3.5 shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                      {pillar.icon}
                    </span>
                  </div>

                  {/* Center: Pillar Number + Title */}
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="font-label-code text-[11px] uppercase tracking-wider text-outline font-semibold block leading-tight">
                      Pillar {pillar.number}
                    </span>
                    <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface tracking-tight mt-0.5">
                      {pillar.name}
                    </h3>
                  </div>

                  {/* Right: Expand/Collapse Circle Button with Glow Effect */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15'
                        : 'bg-[#FFF0F3] text-primary border border-pink-100/80 hover:bg-[#FCE7EB]'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
                        isExpanded ? 'rotate-180 text-white' : 'text-primary'
                      }`}
                    />
                  </div>
                </button>

                {/* Smooth Expand/Collapse Content Container using CSS Grid rows */}
                <div
                  id={`pillar-panel-${idx}`}
                  role="region"
                  aria-labelledby={`pillar-trigger-${idx}`}
                  className={`grid transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-pink-100/60 mt-1">
                      {/* Full Pillar Description */}
                      <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Supporting Bullet Points */}
                      <ul className="space-y-2 pt-1 border-t border-hairline-light/60">
                        {pillar.details.map((detail, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-center gap-2.5 text-xs text-on-surface font-medium"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                              aria-hidden="true"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Full-width CTA Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenIncubationModal && onOpenIncubationModal(pillar.name.toLowerCase())}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#FFF0F3] hover:bg-primary text-primary hover:text-white transition-all duration-200 flex items-center justify-between font-label-caps text-[11px] sm:text-xs uppercase tracking-wider font-semibold active:scale-[0.99] cursor-pointer shadow-2xs group"
                        >
                          <span>{pillar.tagline}</span>
                          <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
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
            DESKTOP & TABLET VIEW (>= 768px): 2-COLUMN / 4-COLUMN GRID (PRESERVED)
            ================================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fourPillars.map((pillar, idx) => (
            <ParallaxCard
              key={pillar.number || idx}
              index={idx}
              className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-pink-100 shadow-sm justify-between h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
              </div>
              {/* Header */}
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
              {/* Bullet list */}
              <ul className="space-y-1.5 pt-2 border-t border-hairline-light/60">
                {pillar.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-2 text-xs text-on-surface font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => onOpenIncubationModal && onOpenIncubationModal(pillar.name.toLowerCase())}
                  className="w-full py-2 px-3.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary flex items-center justify-between font-label-caps text-[11px] uppercase tracking-wider font-semibold cursor-pointer transition-colors"
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
