import React from 'react';
import { Spatial3DContainer } from '../components/spatial/Spatial3DContainer';
import { SpatialScene } from '../components/spatial/SpatialScene';
import VideoBannerSection from '../components/sections/VideoBannerSection';
import HeroSection from '../components/sections/HeroSection';
import MetricsRibbon from '../components/sections/MetricsRibbon';
import JourneySection from '../components/sections/JourneySection';
import MomentsPhotoReel from '../components/sections/MomentsPhotoReel';
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
    <Spatial3DContainer>
      {/* 0. Full Landscape Video Intro Banner */}
      <SpatialScene id="scene-video-banner" index={0}>
        <VideoBannerSection />
      </SpatialScene>

      {/* 1. Master Hero Section */}
      <SpatialScene id="scene-hero" index={1}>
        <HeroSection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* 2. Ecosystem Impact Metrics Ribbon */}
      <SpatialScene id="scene-metrics" index={2}>
        <MetricsRibbon />
      </SpatialScene>

      {/* 3. Incubation Journey */}
      <SpatialScene id="scene-journey" index={3}>
        <JourneySection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* 4. Ecosystem Pillars */}
      <SpatialScene id="scene-pillars" index={4}>
        <PillarsSection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* 5. Flagship Programs Suite */}
      <SpatialScene id="scene-programs" index={5}>
        <ProgramsSection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* 6. MIT-Aligned FabLab & Prototyping Infrastructure */}
      <SpatialScene id="scene-fablab" index={6}>
        <FabLabSection onOpenBookingModal={onOpenBookingModal} />
      </SpatialScene>

      {/* 7. Flagship Initiatives & Regional Platforms */}
      <SpatialScene id="scene-flagships" index={7}>
        <FlagshipsSection onSelectPlatform={onOpenPlatformModal} />
      </SpatialScene>

      {/* 8. Distributed Multi-City Regional Studios */}
      <SpatialScene id="scene-studios" index={8}>
        <RegionalStudiosSection onOpenIncubationModal={onOpenIncubationModal} />
      </SpatialScene>

      {/* 9. Institutional Leadership */}
      <SpatialScene id="scene-leadership" index={9}>
        <LeadershipSection onOpenMentorModal={onOpenMentorModal} />
      </SpatialScene>

      {/* 9.5 Moments Photo Reel */}
      <SpatialScene id="scene-moments-reel" index={9.5}>
        <MomentsPhotoReel />
      </SpatialScene>

      {/* 10. Call to Action */}
      <SpatialScene id="scene-cta" index={10}>
        <CtaSection
          onOpenIncubationModal={onOpenIncubationModal}
          onOpenMentorModal={onOpenMentorModal}
        />
      </SpatialScene>
    </Spatial3DContainer>
  );
}
