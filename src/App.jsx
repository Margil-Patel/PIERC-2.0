import React, { useState } from 'react';
import './App.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import MetricsRibbon from './components/sections/MetricsRibbon';
import PillarsSection from './components/sections/PillarsSection';
import JourneySection from './components/sections/JourneySection';
import ProgramsSection from './components/sections/ProgramsSection';
import FabLabSection from './components/sections/FabLabSection';
import FlagshipsSection from './components/sections/FlagshipsSection';
import RegionalStudiosSection from './components/sections/RegionalStudiosSection';
import LeadershipSection from './components/sections/LeadershipSection';
import CtaSection from './components/sections/CtaSection';

import IncubationModal from './components/modals/IncubationModal';
import FabLabBookingModal from './components/modals/FabLabBookingModal';
import MentorModal from './components/modals/MentorModal';
import PlatformModal from './components/modals/PlatformModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  
  // Initialize High-Performance Scroll Reveal System
  useScrollReveal();
  
  // Modals state
  const [incubationModalOpen, setIncubationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('nivesh');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBay, setSelectedBay] = useState('');

  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleOpenIncubationModal = (programId = 'nivesh') => {
    setSelectedProgram(programId);
    setIncubationModalOpen(true);
  };

  const handleOpenBookingModal = (bayName = '') => {
    setSelectedBay(bayName);
    setBookingModalOpen(true);
  };

  const handleOpenPlatformModal = (platform) => {
    setSelectedPlatform(platform);
    setPlatformModalOpen(true);
  };

  return (
    <div className="site flex flex-col min-h-screen text-white antialiased">
      {/* Dual-Tier Header & Top Announcement Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onOpenIncubationModal={handleOpenIncubationModal}
      />

      {/* Main Content Body */}
      <main className="w-full bg-[#050912] flex-1">
        <div className="flex flex-col w-full">
          {/* 1. Master Hero Section */}
          <HeroSection onOpenIncubationModal={handleOpenIncubationModal} />

          {/* 2. Audited Ecosystem Impact Metrics Ribbon */}
          <MetricsRibbon />

          {/* 3. The Four Pillars (Ideation, Innovation, Incubation, Growth) */}
          <PillarsSection onOpenIncubationModal={handleOpenIncubationModal} />

          {/* 4. Structured Founder Runway / Journey */}
          <JourneySection onOpenIncubationModal={handleOpenIncubationModal} />

          {/* 5. Flagship Accelerators Suite */}
          <ProgramsSection onOpenIncubationModal={handleOpenIncubationModal} />

          {/* 6. MIT-Aligned FabLab & Prototyping Infrastructure */}
          <FabLabSection onOpenBookingModal={handleOpenBookingModal} />

          {/* 7. Flagship Initiatives & Western India Conventions */}
          <FlagshipsSection onSelectPlatform={handleOpenPlatformModal} />

          {/* 8. Distributed Multi-City Regional Studios */}
          <RegionalStudiosSection onOpenIncubationModal={handleOpenIncubationModal} />

          {/* 9. Institutional Leadership & Board of Governors */}
          <LeadershipSection onOpenMentorModal={() => setMentorModalOpen(true)} />

          {/* 10. Immersive Final Call to Action */}
          <CtaSection
            onOpenIncubationModal={handleOpenIncubationModal}
            onOpenMentorModal={() => setMentorModalOpen(true)}
          />
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenIncubationModal={handleOpenIncubationModal}
        onOpenMentorModal={() => setMentorModalOpen(true)}
      />

      {/* Interactive Modals */}
      <IncubationModal
        isOpen={incubationModalOpen}
        onClose={() => setIncubationModalOpen(false)}
        initialProgram={selectedProgram}
      />

      <FabLabBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultBay={selectedBay}
      />

      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />

      <PlatformModal
        platform={selectedPlatform}
        isOpen={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        onRegister={(platformTitle) => handleOpenIncubationModal(`event-${platformTitle}`)}
      />
    </div>
  );
}
