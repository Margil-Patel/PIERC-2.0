import React, { useState } from 'react';
import { fabLabBays } from '../../data/ecosystemData';

export default function FabLabSection({ onOpenBookingModal }) {
  const [activeBay, setActiveBay] = useState(0);

  return (
    <section id="fablab-infrastructure" className="w-full bg-graphite-deep text-canvas-light py-20 lg:py-28 border-b border-graphite-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="reveal-eyebrow inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-graphite-surface border border-graphite-border text-electric-glow">
              <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
              <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                MIT-Aligned FabLab Network
              </span>
            </div>

            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-canvas-light font-extrabold tracking-tight leading-tight">
              Build it. Test it.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-canvas-light via-electric-glow to-secondary-container">
                Make it real.
              </span>
            </h2>

            <p className="reveal-desc font-body-lg text-base text-outline-variant leading-relaxed">
              Hardware, IoT, and medical technology startups need more than conference rooms. PIERC hosts industrial-grade rapid prototyping stations staffed by dedicated FabLab engineers.
            </p>

            <div className="space-y-3 pt-2 reveal-stagger">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-graphite-surface border border-graphite-border">
                <span className="material-symbols-outlined text-electric-glow text-[24px] mt-0.5 shrink-0">print</span>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-canvas-light">
                    Additive Manufacturing &amp; 3D Printing
                  </h4>
                  <p className="font-body-sm text-xs text-outline-variant mt-1 leading-relaxed">
                    SLA, SLS, and industrial FDM printers supporting aerospace polymers and functional biocompatible resins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-graphite-surface border border-graphite-border">
                <span className="material-symbols-outlined text-electric-glow text-[24px] mt-0.5 shrink-0">memory</span>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-canvas-light">
                    Electronics &amp; Embedded PCB Bay
                  </h4>
                  <p className="font-body-sm text-xs text-outline-variant mt-1 leading-relaxed">
                    Micro-soldering, signal analyzers, high-speed oscilloscope clusters, and multi-layer SMD reflow ovens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-graphite-surface border border-graphite-border">
                <span className="material-symbols-outlined text-electric-glow text-[24px] mt-0.5 shrink-0">carpenter</span>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-canvas-light">
                    CNC Milling &amp; Precision Laser Cutters
                  </h4>
                  <p className="font-body-sm text-xs text-outline-variant mt-1 leading-relaxed">
                    Sub-millimeter subtractive manufacturing for aluminum, composites, acrylics, and structural tooling.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBookingModal(fabLabBays[activeBay].name)}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-electric-glow text-graphite-deep font-body-md text-sm font-bold hover:bg-white transition-all shadow-lg hover:shadow-electric-glow/30"
              >
                Book FabLab Exploration →
              </button>
            </div>
          </div>

          {/* Right Interactive Prototyping Showcase (4 Bays Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-stagger">
            {fabLabBays.map((bay, idx) => {
              const isActive = activeBay === idx;
              return (
                <div
                  key={bay.id}
                  onClick={() => setActiveBay(idx)}
                  className={`p-5 rounded-3xl bg-graphite-surface border transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4 ${
                    isActive
                      ? 'border-electric-glow shadow-xl shadow-electric-glow/10 scale-[1.01]'
                      : 'border-graphite-border hover:border-graphite-border/90'
                  }`}
                >
                  <div className="h-44 rounded-2xl bg-graphite-deep relative overflow-hidden group border border-graphite-border">
                    <img
                      src={bay.image}
                      alt={bay.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 reveal-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite-deep/80 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-graphite-deep/90 border border-graphite-border text-[11px] font-label-code text-electric-glow">
                      {bay.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-label-caps text-xs uppercase text-electric-glow font-bold block">
                      {bay.name}
                    </span>
                    <h4 className="font-headline-sm text-lg font-bold text-canvas-light">
                      {bay.title}
                    </h4>
                    <p className="font-body-sm text-xs text-outline-variant leading-relaxed">
                      {bay.description}
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="pt-3 border-t border-graphite-border/60 space-y-1">
                    {bay.specs.map((spec, sIdx) => (
                      <p key={sIdx} className="text-[11px] text-surface-variant flex items-center gap-1.5">
                        <span className="text-electric-glow">•</span>
                        <span>{spec}</span>
                      </p>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBookingModal(bay.name);
                    }}
                    className="w-full py-2 rounded-xl bg-graphite-deep hover:bg-graphite-border text-canvas-light text-xs font-semibold font-label-caps uppercase transition-colors"
                  >
                    Reserve {bay.name} Slot →
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
