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

  // Lock body scroll when mobile navigation drawer is active
  React.useEffect(() => {
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
      <div className="announcement-bar flex items-center justify-between overflow-hidden">
        <div className="announcement-left flex-1 min-w-0 overflow-hidden">
          <span className="announcement-dot shrink-0" />
          <div className="overflow-hidden whitespace-nowrap">
            <span className="inline-block animate-marquee sm:animate-none font-medium text-[11px] sm:text-xs">
              APPLICATIONS OPEN: STARTUP NIVESH 3.0 &amp; HEALTHTECH ACCELERATOR • COHORT 2026
            </span>
          </div>
        </div>

        <div className="announcement-right shrink-0 hidden md:flex">
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
          onClick={() => setMobileOpen(false)}
          className="brand hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="brand-mark">
            P
          </div>
          <div className="brand-text">
            <div className="brand-name">
              PIERC
            </div>
            <div className="brand-university hidden xs:block">
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
            onClick={() => {
              setMobileOpen(false);
              navigate('/programs');
            }}
            className="search-btn"
            title="Search Programs"
            aria-label="Search Programs"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Mobile hamburger / close toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-rose-600 transition-all focus:outline-none"
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Menu Container - Full Width */}
          <div className="fixed inset-x-0 top-[72px] sm:top-[80px] bottom-0 z-50 bg-[#080d1a] border-t border-rose-500/20 shadow-2xl px-6 py-5 flex flex-col justify-between overflow-y-auto animate-fadeIn w-full">
            <div className="flex flex-col gap-1">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-extrabold text-sm flex items-center justify-center">
                    P
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block leading-none">PIERC Navigation</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Parul University</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-widest text-rose-500 mb-1 px-1">
                Navigation Menu
              </div>
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="material-symbols-outlined text-[20px]">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                  <span className="text-slate-500 text-sm">→</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenIncubationModal?.();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
              >
                <span>Apply for Incubation</span>
                <span>→</span>
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/programs');
                }}
                className="w-full py-3 px-6 rounded-xl border border-white/15 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Explore All 6 Cohort Programs</span>
              </button>

              {/* Emergency & Helpline strip */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Campus Helpline: 0266-8260350</span>
                <span className="text-rose-400 font-semibold">Limda, Vadodara</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
