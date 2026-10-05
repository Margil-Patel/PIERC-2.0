import React from 'react';
import { Spatial3DContainer } from '../components/spatial/Spatial3DContainer';
import { SpatialScene } from '../components/spatial/SpatialScene';
import PillarsSection from '../components/sections/PillarsSection';
import JourneySection from '../components/sections/JourneySection';
import MetricsRibbon from '../components/sections/MetricsRibbon';
import LeadershipSection from '../components/sections/LeadershipSection';
import CtaSection from '../components/sections/CtaSection';

export default function AboutPage({ onOpenIncubationModal, onOpenMentorModal }) {
  return (
    <Spatial3DContainer>
      {/* Hero Banner for About */}
      <SpatialScene id="about-hero" index={0}>
        <section className="relative bg-gradient-to-br from-[#fff0f4] via-[#fce7f0] to-[#fbcfe8]/40 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-pink-200/80">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-6xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-pink-200 shadow-sm">
              About PIERC • Parul University
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Architecting Gujarat's <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">Deep-Tech</span> Innovation Frontier
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
              Parul Innovation &amp; Entrepreneurship Research Centre (PIERC) is a Section 8 non-profit startup incubator backed by Parul University, DST, and BIRAC. We empower student researchers, tech inventors, and visionary founders to build enterprise-grade companies.
            </p>
          </div>
        </section>
      </SpatialScene>

      {/* Metrics Ribbon */}
      <SpatialScene id="about-metrics" index={1}>
        <MetricsRibbon />
      </SpatialScene>

      {/* Ecosystem Pillars */}
      <SpatialScene id="about-pillars" index={2}>
        <PillarsSection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* Incubation Spaceship Journey */}
      <SpatialScene id="about-journey" index={3}>
        <JourneySection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* Leadership Overview */}
      <SpatialScene id="about-leadership" index={4}>
        <LeadershipSection onOpenMentorModal={onOpenMentorModal} />
      </SpatialScene>

      {/* CTA Section */}
      <SpatialScene id="about-cta" index={5}>
        <CtaSection
          onOpenIncubationModal={onOpenIncubationModal}
          onOpenMentorModal={onOpenMentorModal}
        />
      </SpatialScene>
    </Spatial3DContainer>
  );
}
