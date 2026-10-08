import React, { useState } from 'react';
import { fabLabBays } from '../../data/ecosystemData';

export default function FabLabSection({ onOpenBookingModal }) {
  const [selectedBay, setSelectedBay] = useState(0);

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
              {[
                {
                  bayIndex: 0,
                  icon: 'print',
                  title: 'Additive Manufacturing & 3D Printing',
                  desc: 'SLA, SLS, and industrial FDM printers supporting aerospace polymers and functional biocompatible resins.'
                },
                {
                  bayIndex: 1,
                  icon: 'memory',
                  title: 'Electronics & Embedded PCB Bay',
                  desc: 'Micro-soldering, signal analyzers, high-speed oscilloscope clusters, and multi-layer SMD reflow ovens.'
                },
                {
                  bayIndex: 2,
                  icon: 'carpenter',
                  title: 'CNC Milling & Precision Laser Cutters',
                  desc: 'Sub-millimeter subtractive manufacturing for aluminum, composites, acrylics, and structural tooling.'
                },
                {
                  bayIndex: 3,
                  icon: 'biotech',
                  title: 'BioNEST Analytical Lab & Wet Stations',
                  desc: 'Spectrophotometry, autoclave sterility suites, live cell culture incubators, and clinical sample storage.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedBay(item.bayIndex);
                    onOpenBookingModal(fabLabBays[item.bayIndex].name);
                  }}
                  className="group relative flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-electric-glow hover:bg-slate-800/90 hover:translate-x-1.5 hover:shadow-xl hover:shadow-electric-glow/15 hover:ring-1 hover:ring-electric-glow/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Whole-Card Ambient Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-glow/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                  <div className="relative p-2.5 rounded-xl bg-slate-950 text-electric-glow border border-slate-800/80 group-hover:border-electric-glow/50 group-hover:bg-electric-glow group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-electric-glow/30 transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[22px] block">
                      {item.icon}
                    </span>
                  </div>

                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-sm font-bold text-canvas-light group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </h4>
                      <span className="material-symbols-outlined text-[16px] text-outline-variant opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-electric-glow transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-outline-variant mt-1 leading-relaxed group-hover:text-slate-200 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBookingModal(fabLabBays[selectedBay]?.name || fabLabBays[0].name)}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-electric-glow text-graphite-deep font-body-md text-sm font-bold hover:bg-white transition-all shadow-lg hover:shadow-electric-glow/30"
              >
                Book FabLab Exploration →
              </button>
            </div>
          </div>

          {/* Right Interactive Prototyping Showcase (4 Bays Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-stagger">
            {fabLabBays.map((bay, idx) => (
              <div
                key={bay.id}
                onClick={() => {
                  setSelectedBay(idx);
                  onOpenBookingModal(bay.name);
                }}
                className="group relative p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-electric-glow hover:bg-slate-800/90 hover:shadow-2xl hover:shadow-electric-glow/20 hover:ring-1 hover:ring-electric-glow/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4 overflow-hidden"
              >
                {/* Whole-Card Ambient Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-glow/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

                <div className="relative h-44 rounded-2xl bg-graphite-deep overflow-hidden border border-slate-800 group-hover:border-slate-700 transition-colors">
                  <img
                    src={bay.image}
                    alt={bay.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 reveal-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-deep/80 via-transparent to-transparent pointer-events-none"></div>
                  <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-800 text-[11px] font-label-code text-electric-glow group-hover:border-electric-glow/40 transition-colors pointer-events-none">
                    {bay.category}
                  </span>
                </div>

                <div className="relative space-y-2">
                  <span className="font-label-caps text-xs uppercase text-electric-glow font-bold block">
                    {bay.name}
                  </span>
                  <h4 className="font-headline-sm text-lg font-bold text-canvas-light group-hover:text-white transition-colors">
                    {bay.title}
                  </h4>
                  <p className="font-body-sm text-xs text-outline-variant group-hover:text-slate-200 leading-relaxed transition-colors">
                    {bay.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="relative pt-3 border-t border-slate-800/80 space-y-1">
                  {bay.specs.map((spec, sIdx) => (
                    <p key={sIdx} className="text-[11px] text-surface-variant group-hover:text-slate-300 flex items-center gap-1.5 transition-colors">
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
                  className="relative w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-electric-glow group-hover:border-electric-glow group-hover:text-graphite-deep text-canvas-light text-xs font-semibold font-label-caps uppercase transition-all duration-200 shadow-sm"
                >
                  Reserve {bay.name} Slot →
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
