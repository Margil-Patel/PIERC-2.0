import React from 'react';
import VideoBannerSection from '../components/sections/VideoBannerSection';
import HeroSection from '../components/sections/HeroSection';
import MetricsRibbon from '../components/sections/MetricsRibbon';
import JourneySection from '../components/sections/JourneySection';
import PillarsSection from '../components/sections/PillarsSection';
import ProgramsSection from '../components/sections/ProgramsSection';
import FabLabSection from '../components/sections/FabLabSection';
import FlagshipsSection from '../components/sections/FlagshipsSection';
import RegionalStudiosSection from '../components/sections/RegionalStudiosSection';
import LeadershipSection from '../components/sections/LeadershipSection';
import CtaSection from '../components/sections/CtaSection';

export default function HomePage({
  onOpenIncubationModal,
  onOpenBookingModal,
  onOpenMentorModal,
  onOpenPlatformModal,
}) {
  return (
    <div className="flex flex-col w-full">
      {/* 0. Full Landscape Video Intro Banner */}
      <VideoBannerSection />

      {/* 1. Master Hero Section */}
      <HeroSection onOpenIncubationModal={onOpenIncubationModal} />

      {/* 2. Ecosystem Impact Metrics Ribbon */}
      <MetricsRibbon />

      {/* 3. Incubation Journey */}
      <JourneySection onOpenIncubationModal={onOpenIncubationModal} />

      {/* 4. Ecosystem Pillars */}
      <PillarsSection onOpenIncubationModal={onOpenIncubationModal} />

      {/* 5. Flagship Programs Suite */}
      <ProgramsSection onOpenIncubationModal={onOpenIncubationModal} />

      {/* 6. MIT-Aligned FabLab & Prototyping Infrastructure */}
      <FabLabSection onOpenBookingModal={onOpenBookingModal} />

      {/* 7. Flagship Initiatives & Regional Platforms */}
      <FlagshipsSection onSelectPlatform={onOpenPlatformModal} />

      {/* 8. Distributed Multi-City Regional Studios */}
      <RegionalStudiosSection onOpenIncubationModal={onOpenIncubationModal} />

      {/* 9. Institutional Leadership */}
      <LeadershipSection onOpenMentorModal={onOpenMentorModal} />

      {/* 10. Call to Action */}
      <CtaSection
        onOpenIncubationModal={onOpenIncubationModal}
        onOpenMentorModal={onOpenMentorModal}
      />
    </div>
  );
}
