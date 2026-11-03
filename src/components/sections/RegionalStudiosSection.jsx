import React, { useState } from 'react';
import { regionalStudios } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function RegionalStudiosSection({ onOpenIncubationModal }) {
  const [activeStudio, setActiveStudio] = useState(0);

  return (
    <section id="regional-studios" className="w-full bg-surface-container-low py-12 md:py-20 lg:py-28 border-b border-hairline-light overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 md:mb-16 space-y-2 md:space-y-3">
          <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-[11px] sm:text-xs flex items-center gap-2.5">
            <span className="reveal-eyebrow-line bg-primary" />
            <span>Multi-City Infrastructure</span>
          </div>
          <h2 className="reveal-heading font-headline-xl text-2xl sm:text-3xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
            Distributed Regional Startup Studios
          </h2>
          <p className="reveal-desc font-body-md text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
            PIERC extends far beyond its Vadodara campus, orchestrating dedicated startup studio centers across Gujarat's key industrial corridors.
          </p>
        </div>

        {/* ==================================================================
            MOBILE VIEW (< 768px): COMPACT HORIZONTAL INFORMATION CARDS
            ================================================================== */}
        <div className="flex flex-col gap-3.5 md:hidden">
          {regionalStudios.map((studio) => {
            const isVadodara = studio.id === 'vadodara';

            return (
              <div
                key={studio.id}
                className={`w-full rounded-2xl bg-white p-3.5 sm:p-4 transition-all duration-300 flex flex-col gap-2.5 ${
                  isVadodara
                    ? 'border-2 border-primary/50 shadow-md shadow-pink-100/60'
                    : 'border border-pink-100/80 shadow-2xs hover:border-pink-200'
                }`}
              >
                {/* Top Row: Left Icon + Right Content */}
                <div className="flex items-start gap-3 sm:gap-3.5">
                  {/* Studio Icon Container */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFF0F3] border border-pink-100/80 flex items-center justify-center text-primary shrink-0 shadow-2xs mt-0.5">
                    <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                      {studio.icon}
                    </span>
                  </div>

                  {/* Right Header & Content */}
                  <div className="min-w-0 flex-1">
                    {/* Category Label + Specialization / Capacity Badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-label-code text-[11px] font-bold text-primary">
                        {studio.tag}
                      </span>
                      <span className="font-label-caps text-[9.5px] font-bold text-primary bg-[#FFF0F3] border border-pink-200/60 px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                        {studio.stats}
                      </span>
                    </div>

                    {/* Studio Name */}
                    <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface leading-tight mt-0.5">
                      {studio.name}
                    </h3>

                    {/* Complete Description (No Truncation / No Line Clamping) */}
                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mt-1">
                      {studio.description}
                    </p>
                  </div>
                </div>

                {/* Slim, Light-Pink Horizontal Location Row */}
                <div className="w-full py-1.5 px-3 rounded-xl bg-[#FFF0F3] border border-pink-100/70 flex items-center gap-1.5 text-xs text-on-surface font-medium leading-tight">
                  <span className="material-symbols-outlined text-primary text-[15px] shrink-0" aria-hidden="true">
                    location_on
                  </span>
                  <span className="break-words">
                    <strong className="font-semibold text-on-surface">Location:</strong> {studio.location}
                  </span>
                </div>

                {/* Bottom Row: Contact Person, Designation, and Connect CTA */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span className="material-symbols-outlined text-primary text-[16px] shrink-0" aria-hidden="true">
                      person
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap text-[11px] sm:text-xs">
                      <span className="font-bold text-primary shrink-0">
                        {studio.lead}
                      </span>
                      <span className="text-pink-300">|</span>
                      <span className="text-on-surface-variant font-medium">
                        {studio.role}
                      </span>
                    </div>
                  </div>

                  {/* Connect CTA Button */}
                  <button
                    type="button"
                    onClick={() => onOpenIncubationModal && onOpenIncubationModal(`studio-${studio.id}`)}
                    className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all shrink-0 active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <span>Connect</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* ==================================================================
            DESKTOP & TABLET VIEW (>= 768px): 2-COLUMN / 4-COLUMN GRID (PRESERVED)
            ================================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionalStudios.map((studio, idx) => {
            const isSelected = activeStudio === idx;
            return (
              <ParallaxCard
                key={studio.id}
                index={idx}
                onClick={() => setActiveStudio(idx)}
                className={`p-6 rounded-3xl bg-surface-card border transition-all duration-300 space-y-5 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-hairline-light hover:border-primary/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">{studio.icon}</span>
                    </div>
                    <span className="text-[11px] font-label-code text-primary font-bold bg-surface-container px-2.5 py-1 rounded-full">
                      {studio.stats}
                    </span>
                  </div>

                  <div>
                    <span className="font-label-code text-xs text-primary font-semibold block">
                      {studio.tag}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-on-surface mt-1">
                      {studio.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {studio.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-hairline-light space-y-1">
                    <span className="text-[11px] font-label-caps text-outline-variant uppercase tracking-wider block font-semibold">
                      Location
                    </span>
                    <p className="text-xs text-on-surface font-medium leading-tight">
                      {studio.location}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline-light/60 space-y-2">
                  <div className="text-on-surface font-label-code text-xs flex flex-col">
                    <span className="font-semibold text-primary">{studio.lead}</span>
                    <span className="text-[11px] text-outline">{studio.role}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenIncubationModal(`studio-${studio.id}`);
                    }}
                    className="w-full py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-semibold font-label-caps uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Connect with {studio.name.replace(' Studio', '')} →
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
