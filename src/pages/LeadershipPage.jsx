import React from 'react';
import LeadershipSection from '../components/sections/LeadershipSection';
import CtaSection from '../components/sections/CtaSection';

export default function LeadershipPage({ onOpenMentorModal, onOpenIncubationModal }) {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Hero Banner for Leadership */}
      <section className="relative bg-gradient-to-br from-[#fff0f4] via-[#fce7f0] to-[#fbcfe8]/40 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-pink-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-pink-200 shadow-sm">
            Institutional Leadership &amp; Board of Governors
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Guided by Industry Titans &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">Academic Pioneers</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
            Our governing board, university leadership, and advisory network bring together world-class domain expertise in engineering, healthcare, legal compliance, and venture finance.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenMentorModal()}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-lg hover:shadow-rose-600/20"
            >
              Join Mentor Network →
            </button>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <LeadershipSection onOpenMentorModal={onOpenMentorModal} />

      {/* Advisory & Mentor Spotlight */}
      <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Global Mentor Network &amp; Advisory Council
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Connecting student &amp; deep-tech founders with seasoned domain advisors, serial entrepreneurs, and angel investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Domain Excellence</span>
              <h3 className="text-xl font-bold text-slate-900">Deep-Tech &amp; AI Mentors</h3>
              <p className="text-slate-600 text-sm">Engineers and researchers from top IITs, IISc, and global tech labs guiding algorithm design and AI infrastructure.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Regulatory &amp; Legal</span>
              <h3 className="text-xl font-bold text-slate-900">IP Attorneys &amp; Compliance</h3>
              <p className="text-slate-600 text-sm">Patent agents helping founders draft non-provisional patent applications, trademark registrations, and FDA/CDSCO filings.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Capital Growth</span>
              <h3 className="text-xl font-bold text-slate-900">VCs &amp; Angel Investors</h3>
              <p className="text-slate-600 text-sm">Active institutional investors, venture debt providers, and angel syndicate leads reviewing monthly cohort pitches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        onOpenIncubationModal={onOpenIncubationModal}
        onOpenMentorModal={onOpenMentorModal}
      />
    </div>
  );
}
