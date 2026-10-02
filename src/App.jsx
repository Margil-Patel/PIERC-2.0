import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import ScrollToTop from './components/common/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import FabLabPage from './pages/FabLabPage';
import FlagshipsPage from './pages/FlagshipsPage';
import StudiosPage from './pages/StudiosPage';
import LeadershipPage from './pages/LeadershipPage';
import ApplyIncubationPage from './pages/ApplyIncubationPage';
import NotFoundPage from './pages/NotFoundPage';

// Modals
import FabLabBookingModal from './components/modals/FabLabBookingModal';
import MentorModal from './components/modals/MentorModal';
import PlatformModal from './components/modals/PlatformModal';

function AppContent() {
  const navigate = useNavigate();
  
  // Initialize High-Performance Scroll Reveal System
  useScrollReveal();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBay, setSelectedBay] = useState('');

  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleOpenIncubationModal = (programId = 'nivesh') => {
    navigate(`/apply?program=${encodeURIComponent(programId)}`);
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
    <div className="site flex flex-col min-h-screen text-slate-900 bg-white antialiased">
      {/* Dual-Tier Header & Top Announcement Bar */}
      <Header
        onOpenIncubationModal={handleOpenIncubationModal}
      />

      {/* Main Content Body */}
      <main className="w-full bg-white flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenBookingModal={handleOpenBookingModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
                onOpenPlatformModal={handleOpenPlatformModal}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            }
          />
          <Route
            path="/programs"
            element={
              <ProgramsPage
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            }
          />
          <Route
            path="/fablab"
            element={
              <FabLabPage
                onOpenBookingModal={handleOpenBookingModal}
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            }
          />
          <Route
            path="/flagships"
            element={
              <FlagshipsPage
                onOpenPlatformModal={handleOpenPlatformModal}
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            }
          />
          <Route
            path="/studios"
            element={
              <StudiosPage
                onOpenIncubationModal={handleOpenIncubationModal}
                onOpenMentorModal={() => setMentorModalOpen(true)}
              />
            }
          />
          <Route
            path="/leadership"
            element={
              <LeadershipPage
                onOpenMentorModal={() => setMentorModalOpen(true)}
                onOpenIncubationModal={handleOpenIncubationModal}
              />
            }
          />
          <Route
            path="/apply"
            element={<ApplyIncubationPage />}
          />
          <Route
            path="/apply-incubation"
            element={<ApplyIncubationPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenIncubationModal={handleOpenIncubationModal}
        onOpenMentorModal={() => setMentorModalOpen(true)}
      />

      {/* Interactive Modals */}
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
