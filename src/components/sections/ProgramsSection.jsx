import React from 'react';
import { flagshipPrograms } from '../../data/ecosystemData';

export default function ProgramsSection({ onOpenIncubationModal }) {
  const nivesh = flagshipPrograms.find(p => p.id === 'nivesh');
  const healthtech = flagshipPrograms.find(p => p.id === 'healthtech');
  const otherPrograms = flagshipPrograms.filter(p => p.id !== 'nivesh' && p.id !== 'healthtech');

  return (
    <section id="flagship-programs" className="w-full bg-surface py-20 lg:py-28 border-b border-hairline-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Flagship Accelerators</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
              Targeted Venture Cohorts
            </h2>
          </div>
          <p className="reveal-desc font-body-md text-base text-on-surface-variant max-w-md leading-relaxed">
            Structured, milestone-driven programs with non-dilutive grant support, institutional mentors, and direct LP/GP syndicates.
          </p>
        </div>

        {/* Top Highlight Grid (Startup Nivesh + HealthTech) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 reveal-stagger">
          
          {/* Spotlight Featured Program: STARTUP NIVESH 3.0 */}
          {nivesh && (
            <div className="lg:col-span-8 p-8 lg:p-10 rounded-3xl bg-surface-container-high border border-primary/20 relative overflow-hidden shadow-xl flex flex-col justify-between">
              {/* Background watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[200px] text-primary">rocket_launch</span>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-semibold shadow-sm">
                      {nivesh.badge}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card text-on-surface font-label-code text-xs font-semibold shadow-sm border border-hairline-light">
                      <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                      {nivesh.status}
                    </span>
                  </div>

                  <h3 className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                    {nivesh.title}
                  </h3>

                  <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    {nivesh.description}
                  </p>
                </div>

                {/* Value Props 3-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30">
                  {nivesh.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-surface-card/90 backdrop-blur-sm border border-hairline-light shadow-sm">
                      <span className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold">
                        {m.label}
                      </span>
                      <span className="font-headline-md text-2xl font-bold text-primary block mt-0.5">
                        {m.value}
                      </span>
                      <span className="font-body-sm text-xs text-on-surface-variant block mt-1">
                        {m.subtext}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenIncubationModal('nivesh')}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-body-md text-sm font-semibold transition-all shadow-md hover:shadow-xl hover:shadow-primary/25"
                  >
                    {nivesh.cta} →
                  </button>
                  <span className="font-label-code text-xs text-on-surface-variant font-medium bg-surface-card px-3 py-2 rounded-lg border border-hairline-light">
                    {nivesh.timeline}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* HealthTech Accelerator Program */}
          {healthtech && (
            <div className="lg:col-span-4 p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-xs font-semibold uppercase">
                    {healthtech.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">{healthtech.icon}</span>
                  </div>
                </div>

                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">
                  {healthtech.title}
                </h3>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {healthtech.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-hairline-light/60">
                  {healthtech.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-body-sm text-xs text-on-surface font-medium">
                      <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">verified</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenIncubationModal('healthtech')}
                  className="w-full inline-flex items-center justify-center h-11 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-body-sm text-sm font-semibold transition-all shadow-sm"
                >
                  {healthtech.cta} →
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Secondary Program Cards (Growthpad, MBA EIS, Bootcamp) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {otherPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-surface-card border border-hairline-light shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[11px] text-primary font-semibold uppercase tracking-wider block">
                    {prog.badge}
                  </span>
                  <span className="text-[11px] font-label-code text-outline-variant bg-surface-container px-2 py-0.5 rounded-full">
                    {prog.status}
                  </span>
                </div>

                <h4 className="font-headline-md text-xl font-bold text-on-surface">
                  {prog.title}
                </h4>

                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  {prog.description}
                </p>

                <ul className="space-y-1.5 pt-2">
                  {prog.features.map((f, fIdx) => (
                    <li key={fIdx} className="text-xs text-on-surface font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-hairline-light/60 mt-4">
                <button
                  onClick={() => onOpenIncubationModal(prog.id)}
                  className="font-body-sm text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1 group-hover:text-primary-container"
                >
                  <span>{prog.cta}</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
