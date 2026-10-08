import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'About', path: '/about', icon: 'info' },
  { label: 'Programs', path: '/programs', icon: 'rocket_launch' },
  { label: 'FabLab', path: '/fablab', icon: 'precision_manufacturing' },
  { label: 'Flagships', path: '/flagships', icon: 'festival' },
  { label: 'Studios', path: '/studios', icon: 'apartment' },
  { label: 'Leadership', path: '/leadership', icon: 'groups' },
  { label: 'Apply', path: '/apply', icon: 'edit_document' },
];

export default function Header({ onOpenIncubationModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* =========================================
          TOP ANNOUNCEMENT BAR
      ========================================= */}
      <div className="announcement-bar">
        <div className="announcement-left truncate">
          <span className="announcement-dot shrink-0" />
          <span className="truncate">
            APPLICATIONS OPEN: STARTUP NIVESH 3.0 &amp; HEALTHTECH ACCELERATOR • COHORT 2026
          </span>
        </div>

        <div className="announcement-right shrink-0">
          <button
            onClick={() => onOpenIncubationModal?.('nivesh')}
            className="top-link"
          >
            APPLY NOW →
          </button>
          <span className="top-divider" />
          <span className="hidden sm:inline">Parul University Tech Transfer</span>
        </div>
      </div>

      {/* =========================================
          NAVIGATION BAR
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

        {/* Desktop & Mobile Right Actions */}
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
            className="apply-button hidden sm:inline-flex"
          >
            Apply for Incubation
            <span>→</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-primary hover:bg-rose-50 transition-colors"
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* =========================================
          MOBILE NAVIGATION DRAWER & BACKDROP
      ========================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-h-[88vh] bg-white border-b border-pink-200 shadow-2xl rounded-b-3xl overflow-y-auto px-5 pt-4 pb-6 flex flex-col gap-4 animate-fadeIn">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-pink-200 text-rose-600 font-extrabold text-sm flex items-center justify-center">
                  P
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block leading-none">PIERC Navigation</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Parul University</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Nav Links Grid */}
            <nav className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                        : 'text-slate-700 hover:bg-rose-50 hover:text-rose-600'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="material-symbols-outlined text-[16px] opacity-60">chevron_right</span>
                </NavLink>
              ))}
            </nav>

            {/* Drawer Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenIncubationModal?.();
                }}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-[0.99] transition-transform"
              >
                <span>Apply for Incubation</span>
                <span>→</span>
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/programs');
                }}
                className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">explore</span>
                <span>Explore All 6 Cohort Programs</span>
              </button>
            </div>

            {/* Emergency & Helpline strip */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Campus Helpline: 0266-8260350</span>
              <span className="text-rose-600 font-semibold">Limda, Vadodara</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
