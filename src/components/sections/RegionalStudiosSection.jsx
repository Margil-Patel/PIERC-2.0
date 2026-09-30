import React, { useState } from 'react';
import { regionalStudios } from '../../data/ecosystemData';

export default function RegionalStudiosSection({ onOpenIncubationModal }) {
  const [activeStudio, setActiveStudio] = useState(0);

  return (
    <section id="regional-studios" className="w-full bg-surface-container-low py-20 lg:py-28 border-b border-hairline-light">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {regionalStudios.map((studio, idx) => {
            const isSelected = activeStudio === idx;
            return (
              <div
                key={studio.id}
                onClick={() => setActiveStudio(idx)}
                className={`p-6 rounded-3xl bg-surface-card border transition-all duration-300 space-y-5 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-primary shadow-xl ring-2 ring-primary/20 scale-[1.01]'
                    : 'border-hairline-light shadow-sm hover:shadow-md hover:border-primary/30'
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
                    className="w-full py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-semibold font-label-caps uppercase tracking-wider transition-colors"
                  >
                    Connect with {studio.name.replace(' Studio', '')} →
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
