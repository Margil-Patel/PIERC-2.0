import React, { useState } from 'react';
import { regionalStudios } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function RegionalStudiosSection({ onOpenIncubationModal }) {
  const [activeStudio, setActiveStudio] = useState(0);

  return (
    <section id="regional-studios" className="w-full bg-surface-container-low py-20 lg:py-28 border-b border-hairline-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
            <span className="reveal-eyebrow-line bg-primary" />
            <span>Multi-City Infrastructure</span>
          </div>
          <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
            Distributed Regional Startup Studios
          </h2>
          <p className="reveal-desc font-body-md text-base text-on-surface-variant leading-relaxed">
            PIERC extends far beyond its Vadodara campus, orchestrating dedicated startup studio centers across Gujarat's key industrial corridors.
          </p>
        </div>

        {/* 4-Grid Regional Studios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionalStudios.map((studio, idx) => {
            const isSelected = activeStudio === idx;
            return (
              <ParallaxCard
                key={studio.id}
                index={idx}
                onClick={() => setActiveStudio(idx)}
                className={`p-6 rounded-3xl bg-surface-card border space-y-5 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/25 shadow-lg shadow-primary/10'
                    : 'border-hairline-light hover:border-primary/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center text-primary shadow-sm transition-all duration-300">
                      <span className="material-symbols-outlined text-[24px] group-hover:scale-105 transition-transform duration-300">{studio.icon}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" title="Active Studio" />
                      )}
                      <span className="text-[11px] font-label-code text-primary font-bold bg-surface-container group-hover:bg-primary/15 px-2.5 py-1 rounded-full transition-colors duration-300">
                        {studio.stats}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-label-code text-xs text-primary font-semibold block group-hover:translate-x-1 transition-transform duration-300">
                      {studio.tag}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-on-surface mt-1 group-hover:text-primary transition-colors duration-300">
                      {studio.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {studio.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-hairline-light group-hover:border-primary/25 group-hover:bg-surface-card space-y-1 transition-all duration-300">
                    <span className="text-[11px] font-label-caps text-outline-variant uppercase tracking-wider block font-semibold">
                      Location
                    </span>
                    <p className="text-xs text-on-surface font-medium leading-tight">
                      {studio.location}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline-light/60 space-y-3">
                  <div className="text-on-surface font-label-code text-xs flex flex-col">
                    <span className="font-semibold text-primary">{studio.lead}</span>
                    <span className="text-[11px] text-outline">{studio.role}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenIncubationModal(`studio-${studio.id}`);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-surface-container group-hover:bg-primary text-primary group-hover:text-on-primary text-xs font-semibold font-label-caps uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20 active:scale-95"
                  >
                    <span>Connect with {studio.name.replace(' Studio', '')}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold text-sm">→</span>
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
