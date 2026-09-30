import React, { useState } from 'react';
import { journeyStages } from '../../data/ecosystemData';

export default function JourneySection({ onOpenIncubationModal }) {
  const [selectedStage, setSelectedStage] = useState(0);

  return (
    <section id="journey" className="w-full bg-graphite-deep text-canvas-light py-20 lg:py-28 border-b border-graphite-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-electric-glow font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-electric-glow" />
              <span>Venture Progression Model</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-canvas-light font-extrabold tracking-tight">
              The Structured Founder Runway
            </h2>
            <p className="reveal-desc font-body-md text-base text-outline-variant max-w-xl leading-relaxed">
              A battle-tested 6-stage continuum transforming collegiate research hypotheses into venture-backed scalable businesses.
            </p>
          </div>

          <a
            href="#flagship-programs"
            className="reveal-on-scroll inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-graphite-surface border border-graphite-border hover:bg-graphite-border text-electric-glow font-body-sm text-sm font-semibold transition-all self-start md:self-auto"
          >
            <span>View Available Programs</span>
            <span>→</span>
          </a>
        </div>

        {/* Horizontal Progression Cards (6 Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 reveal-stagger">
          {journeyStages.map((stage, idx) => {
            const isSelected = selectedStage === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedStage(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                  isSelected
                    ? 'bg-graphite-surface border-electric-glow shadow-xl shadow-electric-glow/10 scale-[1.02]'
                    : 'bg-graphite-surface/70 border-graphite-border/70 hover:border-graphite-border hover:bg-graphite-surface'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`font-label-code text-sm font-bold ${isSelected ? 'text-electric-glow' : 'text-surface-variant'}`}>
                      {stage.stage}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-graphite-deep border border-graphite-border text-outline-variant font-label-code">
                      {stage.timeframe}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline-sm text-xl font-bold text-canvas-light">
                      {stage.name}
                    </h3>
                    <p className="font-body-sm text-xs text-outline-variant mt-2 leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-graphite-border/60 mt-4">
                  <span className="font-label-caps text-[10px] text-surface-variant block uppercase tracking-wider font-semibold">
                    Core Offering
                  </span>
                  <span className="font-body-sm text-xs text-canvas-light font-medium block mt-0.5">
                    {stage.offering}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="reveal-on-scroll mt-8 p-6 lg:p-8 rounded-3xl bg-graphite-surface border border-graphite-border shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-electric-glow/10 border border-electric-glow/20 text-electric-glow font-label-code text-xs font-bold">
                Stage {journeyStages[selectedStage].stage} • {journeyStages[selectedStage].timeframe}
              </span>
              <span className="text-canvas-light font-bold text-lg">
                {journeyStages[selectedStage].name} Focus
              </span>
            </div>
            <p className="text-sm text-outline-variant">
              {journeyStages[selectedStage].summary} Deliverables built during this phase include:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {journeyStages[selectedStage].deliverables.map((item, dIdx) => (
                <span
                  key={dIdx}
                  className="px-3 py-1 rounded-lg bg-graphite-deep border border-graphite-border text-xs text-canvas-light font-medium"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onOpenIncubationModal(journeyStages[selectedStage].name.toLowerCase())}
              className="w-full lg:w-auto px-6 py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-semibold text-sm transition-all shadow-md"
            >
              Apply for {journeyStages[selectedStage].name} Stage →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
