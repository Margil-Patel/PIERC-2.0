import React, { useState } from 'react';
import { flagshipPrograms } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';
import { ChevronDown } from 'lucide-react';

const PROGRAM_ICONS = {
  healthtech: 'medical_services',
  growthpad: 'trending_up',
  'mba-eis': 'school',
  bootcamp: 'bolt'
};

export default function ProgramsSection({ onOpenIncubationModal }) {
  const nivesh = flagshipPrograms.find(p => p.id === 'nivesh');
  const healthtech = flagshipPrograms.find(p => p.id === 'healthtech');
  const otherPrograms = flagshipPrograms.filter(p => p.id !== 'nivesh' && p.id !== 'healthtech');

  // Mobile secondary programs: HealthTech, Growthpad, MBA in Innovation, and Bootcamp
  const secondaryPrograms = flagshipPrograms.filter(p => p.id !== 'nivesh');

  // Accordion interaction: Initially all collapsed; only one expanded at a time
  const [expandedSecondaryId, setExpandedSecondaryId] = useState(null);

  const toggleSecondary = (id) => {
    setExpandedSecondaryId(prev => (prev === id ? null : id));
  };

  return (
    <section id="flagship-programs" className="w-full bg-surface py-12 lg:py-18 border-b border-hairline-light select-none overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-3 md:gap-4">
          <div className="max-w-xl space-y-2">
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-[11px] flex items-center gap-2.5">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Flagship Accelerators</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
              Targeted Venture Cohorts
            </h2>
            <p className="reveal-desc font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed md:hidden">
              Structured, milestone-driven programs with non-dilutive grant support, institutional mentors, and direct LP/GP syndicates.
            </p>
          </div>
          <p className="reveal-desc font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed hidden md:block">
            Structured, milestone-driven programs with non-dilutive grant support, institutional mentors, and direct LP/GP syndicates.
          </p>
        </div>

        {/* ==================================================================
            MOBILE VIEW (< 768px): FEATURED CARD + COMPACT EXPANDABLE CARDS
            ================================================================== */}
        <div className="md:hidden space-y-4">
          
          {/* Featured Cohort – Startup Nivesh 3.0 */}
          {nivesh && (
            <div className="w-full p-5 rounded-[22px] bg-[#FFE8EE] border border-primary/20 shadow-md shadow-pink-200/40 relative overflow-hidden">
              
              {/* Decorative Background Rocket Illustration */}
              <div className="absolute -top-1 -right-1 w-28 h-28 pointer-events-none opacity-20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[100px] select-none -rotate-45" aria-hidden="true">
                  rocket_launch
                </span>
              </div>

              <div className="relative z-10 space-y-3.5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-2xs">
                    {nivesh.badge}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-on-surface font-label-code text-[10px] font-semibold shadow-2xs border border-pink-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
                    {nivesh.status}
                  </span>
                </div>

                {/* Heading & Description */}
                <div>
                  <h3 className="font-headline-xl text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                    {nivesh.title}
                  </h3>
                  <p className="font-body-md text-xs sm:text-[13px] text-on-surface-variant leading-relaxed mt-1.5">
                    {nivesh.description}
                  </p>
                </div>

                {/* 3 Compact Metric Cards in One Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                  {nivesh.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/95 backdrop-blur-sm border border-pink-100 shadow-2xs flex flex-col justify-between min-w-0"
                    >
                      <span className="font-label-caps text-[8.5px] sm:text-[9.5px] text-on-surface-variant block uppercase font-bold tracking-tight truncate">
                        {m.label}
                      </span>
                      <span className="font-headline-md text-xs sm:text-base font-extrabold text-primary block my-0.5 truncate">
                        {m.value}
                      </span>
                      <span className="font-body-sm text-[9px] sm:text-[10px] text-on-surface-variant/80 block leading-tight line-clamp-2">
                        {m.subtext}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Full-Width Pink/Red Application CTA */}
                <div className="pt-1 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenIncubationModal && onOpenIncubationModal('nivesh')}
                    className="w-full py-3 px-4 rounded-full bg-primary hover:bg-primary-container text-white font-body-md text-xs sm:text-sm font-bold transition-all shadow-md shadow-primary/25 active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{nivesh.cta}</span>
                    <span className="text-sm">→</span>
                  </button>

                  {/* Cohort Starting Date in Subtle Pill */}
                  <div className="flex justify-center">
                    <span className="px-3.5 py-1 rounded-full bg-white/90 border border-pink-200/60 font-label-code text-[11px] font-medium text-on-surface-variant shadow-2xs">
                      {nivesh.timeline}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Remaining 4 Programs: Compact Expandable Cards */}
          <div className="flex flex-col gap-3">
            {secondaryPrograms.map((prog) => {
              const isExpanded = expandedSecondaryId === prog.id;
              const iconName = prog.icon || PROGRAM_ICONS[prog.id] || 'rocket_launch';

              return (
                <div
                  key={prog.id}
                  className={`w-full rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-primary/40 shadow-[0_4px_16px_rgba(225,29,72,0.08)]'
                      : 'border-hairline-light shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-pink-200'
                  }`}
                >
                  {/* Card Header Trigger */}
                  <button
                    type="button"
                    id={`cohort-header-${prog.id}`}
                    onClick={() => toggleSecondary(prog.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`cohort-panel-${prog.id}`}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Soft Pink Icon Container */}
                      <div className="w-11 h-11 rounded-2xl bg-[#FFF0F3] border border-pink-100 flex items-center justify-center text-primary shrink-0 shadow-2xs">
                        <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                          {iconName}
                        </span>
                      </div>

                      {/* Content: Badge, Title & Short Description */}
                      <div className="min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-pink-50 border border-pink-100/80 font-label-caps text-[9px] uppercase font-bold text-primary tracking-wider">
                          {prog.badge}
                        </span>
                        <h4 className="font-headline-md text-sm sm:text-base font-bold text-on-surface leading-tight mt-1 truncate">
                          {prog.title}
                        </h4>
                        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mt-0.5 line-clamp-2">
                          {prog.description}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Chevron (Rotates 180° when expanded) */}
                    <div className="ml-3 shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isExpanded
                            ? 'bg-primary text-white border border-primary shadow-[0_0_14px_rgba(225,29,72,0.45)] scale-105'
                            : 'bg-surface-container text-primary border border-hairline-light/90 shadow-2xs group-hover:border-primary/40 group-active:scale-90 group-active:shadow-[0_0_12px_rgba(225,29,72,0.4)]'
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

                  {/* Smooth Accordion Content */}
                  <div
                    id={`cohort-panel-${prog.id}`}
                    role="region"
                    aria-labelledby={`cohort-header-${prog.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-hairline-light/80 pt-3.5 px-4 pb-4 space-y-3">
                        {/* Subtitle if available */}
                        {prog.subtitle && (
                          <p className="font-label-code text-[11px] text-outline font-semibold uppercase tracking-wider">
                            {prog.subtitle}
                          </p>
                        )}

                        {/* Bullet Details */}
                        <ul className="space-y-2 pt-1">
                          {prog.features?.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-on-surface font-medium leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => onOpenIncubationModal && onOpenIncubationModal(prog.id)}
                            className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-between font-label-caps text-[11px] uppercase tracking-wider font-semibold active:scale-[0.99] border border-pink-200/50 cursor-pointer"
                          >
                            <span>{prog.cta}</span>
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

        </div>

        {/* ==================================================================
            DESKTOP & TABLET VIEW (>= 768px) (PRESERVED UNCHANGED)
            ================================================================== */}
        <div className="hidden md:block">
          
          {/* Top Highlight Grid (Startup Nivesh + HealthTech) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
            
            {/* Spotlight Featured Program: STARTUP NIVESH 3.0 */}
            {nivesh && (
              <ParallaxCard index={0} className="lg:col-span-8 p-6 lg:p-7 rounded-2xl bg-surface-container-high border border-primary/20 relative overflow-hidden shadow-lg flex flex-col justify-between">
                {/* Background watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[160px] text-primary">rocket_launch</span>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-caps text-[11px] uppercase tracking-wider font-semibold shadow-2xs">
                        {nivesh.badge}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-card text-on-surface font-label-code text-[11px] font-semibold shadow-2xs border border-hairline-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                        {nivesh.status}
                      </span>
                    </div>

                    <h3 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      {nivesh.title}
                    </h3>

                    <p className="font-body-lg text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                      {nivesh.description}
                    </p>
                  </div>

                  {/* Value Props 3-Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-outline-variant/30">
                    {nivesh.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface-card/90 backdrop-blur-sm border border-hairline-light shadow-2xs">
                        <span className="font-label-caps text-[9px] text-on-surface-variant block uppercase font-semibold">
                          {m.label}
                        </span>
                        <span className="font-headline-md text-xl font-bold text-primary block mt-0.5">
                          {m.value}
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant block mt-0.5">
                          {m.subtext}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => onOpenIncubationModal('nivesh')}
                      className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-body-md text-xs font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
                    >
                      {nivesh.cta} →
                    </button>
                    <span className="font-label-code text-[11px] text-on-surface-variant font-medium bg-surface-card px-2.5 py-1.5 rounded-lg border border-hairline-light">
                      {nivesh.timeline}
                    </span>
                  </div>
                </div>
              </ParallaxCard>
            )}

            {/* HealthTech Accelerator Program */}
            {healthtech && (
              <ParallaxCard index={1} className="lg:col-span-4 p-6 rounded-2xl bg-surface-card border border-hairline-light shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[11px] font-semibold uppercase">
                      {healthtech.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[20px]">{healthtech.icon}</span>
                    </div>
                  </div>

                  <h3 className="font-headline-lg text-xl font-bold text-on-surface">
                    {healthtech.title}
                  </h3>

                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {healthtech.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-hairline-light/60">
                    {healthtech.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 font-body-sm text-xs text-on-surface font-medium">
                        <span className="material-symbols-outlined text-secondary text-[15px] shrink-0 mt-0.5">verified</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    onClick={() => onOpenIncubationModal('healthtech')}
                    className="w-full inline-flex items-center justify-center h-9 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-body-sm text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    {healthtech.cta} →
                  </button>
                </div>
              </ParallaxCard>
            )}

          </div>

          {/* Secondary Program Cards (Growthpad, MBA EIS, Bootcamp) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {otherPrograms.map((prog, idx) => (
              <ParallaxCard
                key={idx}
                index={idx + 2}
                className="p-5 rounded-2xl bg-surface-card border border-hairline-light shadow-2xs hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-[10px] text-primary font-semibold uppercase tracking-wider block">
                      {prog.badge}
                    </span>
                    <span className="text-[10px] font-label-code text-outline-variant bg-surface-container px-2 py-0.5 rounded-full">
                      {prog.status}
                    </span>
                  </div>

                  <h4 className="font-headline-md text-lg font-bold text-on-surface">
                    {prog.title}
                  </h4>

                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {prog.description}
                  </p>

                  <ul className="space-y-1 pt-1.5">
                    {prog.features.map((f, fIdx) => (
                      <li key={fIdx} className="text-xs text-on-surface font-medium flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-hairline-light/60 mt-3">
                  <button
                    onClick={() => onOpenIncubationModal(prog.id)}
                    className="font-body-sm text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1 group-hover:text-primary-container cursor-pointer"
                  >
                    <span>{prog.cta}</span>
                    <span className="text-xs">→</span>
                  </button>
                </div>
              </ParallaxCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
