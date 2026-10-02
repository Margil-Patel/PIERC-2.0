import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'FabLab', path: '/fablab' },
  { label: 'Flagships', path: '/flagships' },
  { label: 'Studios', path: '/studios' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Apply', path: '/apply' },
];

export default function Header({ onOpenIncubationModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* =========================================
          TOP ANNOUNCEMENT BAR
      ========================================= */}
      <div className="announcement-bar">
        <div className="announcement-left">
          <span className="announcement-dot" />
          <span>
            APPLICATIONS OPEN: STARTUP NIVESH 3.0 &amp; HEALTHTECH ACCELERATOR • COHORT 2026
          </span>
        </div>

        <div className="announcement-right">
          <button
            onClick={() => onOpenIncubationModal?.('nivesh')}
            className="top-link"
          >
            APPLY NOW →
          </button>
          <span className="top-divider" />
          <span>Parul University Tech Transfer</span>
        </div>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}
      <header className="navbar">
        <Link
          to="/"
          className="brand hover:opacity-90 transition-opacity"
        >
          <div className="brand-mark">
            P
          </div>
          <div className="brand-text">
            <div className="brand-name">
              PIERC
            </div>
            <div className="brand-university">
              PARUL UNIVERSITY
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="nav-actions">
          {/* Search button */}
          <button
            onClick={() => navigate('/programs')}
            className="search-btn"
            title="Search Programs"
            aria-label="Search Programs"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <Link
            to="/programs"
            className="explore-link"
          >
            Explore Programs
          </Link>

          <button
            onClick={() => onOpenIncubationModal?.()}
            className="apply-button"
          >
            Apply for Incubation
            <span>→</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#aeb7c7] hover:text-white"
            aria-label="Toggle Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer if opened */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#070c16] border-b border-white/10 px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm py-1.5 transition-colors ${
                  isActive ? 'text-[#38bdf8] font-bold' : 'text-[#aeb7c7] hover:text-[#38bdf8]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenIncubationModal?.();
            }}
            className="apply-button mt-2 justify-center text-center w-full"
          >
            Apply for Incubation →
          </button>
        </div>
      )}
    </>
  );
}
