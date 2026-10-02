import React from 'react';
import ProgramsSection from '../components/sections/ProgramsSection';
import CtaSection from '../components/sections/CtaSection';

export default function ProgramsPage({ onOpenIncubationModal, onOpenMentorModal }) {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Hero Banner for Programs */}
      <section className="relative bg-gradient-to-br from-[#fff0f4] via-[#fce7f0] to-[#fbcfe8]/40 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-pink-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-pink-200 shadow-sm">
            Incubation Tracks &amp; Cohorts 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Flagship Accelerators &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">Funding Suites</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
            From early-stage seed grants (₹10L - ₹25L) to BIRAC Bio-Incubation, Startup Nivesh 3.0, and international market access, discover tailored incubation tracks built for every phase of growth.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenIncubationModal('nivesh')}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-lg hover:shadow-rose-600/20"
            >
              Apply for Startup Nivesh 3.0 →
            </button>
            <button
              onClick={() => onOpenIncubationModal('healthtech')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold border border-slate-300 shadow-sm transition-all"
            >
              HealthTech Cohort
            </button>
          </div>
        </div>
      </section>

      {/* Programs Suite */}
      <ProgramsSection onOpenIncubationModal={onOpenIncubationModal} />

      {/* Program Benefits Grid */}
      <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            What Every Incubated Venture Receives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                ₹
              </div>
              <h3 className="text-xl font-bold text-slate-900">Capital &amp; Grants</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direct access to SSIP 2.0 grants, NIDHI-PRAYAS seed funding up to ₹10 Lakhs, and investor pitch sessions with national VCs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-900">FabLab &amp; Prototyping</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unlimited access to 3D printers, CNC mills, laser cutters, PCB fabrication, and high-performance computing hardware.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                🧠
              </div>
              <h3 className="text-xl font-bold text-slate-900">Global Mentorship</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                1-on-1 advisory from 150+ industry veterans, IP attorneys, regulatory experts, and serial exit founders.
              </p>
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
