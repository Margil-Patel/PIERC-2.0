import React from 'react';
import FabLabSection from '../components/sections/FabLabSection';
import CtaSection from '../components/sections/CtaSection';

export default function FabLabPage({ onOpenBookingModal, onOpenIncubationModal, onOpenMentorModal }) {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Hero Banner for FabLab */}
      <section className="relative bg-gradient-to-br from-[#fff0f4] via-[#fce7f0] to-[#fbcfe8]/40 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-pink-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-pink-200 shadow-sm">
            MIT Fab Foundation Certified • Rapid Hardware Prototyping
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Advanced Prototyping <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">FabLab Suite</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
            Turn CAD models into functional physical hardware in hours. Equipped with precision CNC machinery, SLA/FDM 3D printing farms, SMD electronics stations, and laser precision cutting.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenBookingModal('3d-printing')}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-lg hover:shadow-rose-600/20"
            >
              Book Equipment Bay →
            </button>
          </div>
        </div>
      </section>

      {/* Main FabLab Section */}
      <FabLabSection onOpenBookingModal={onOpenBookingModal} />

      {/* Equipment Bay Specifications */}
      <section className="py-16 px-6 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">
              Hardware Fabrication Infrastructure
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Industrial grade tools available 24/7 for incubates and student innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Bay 01</span>
              <h3 className="text-lg font-bold text-white">Additive Addicts 3D Farm</h3>
              <p className="text-slate-400 text-sm">Industrial FDM, Formlabs Resin SLA, and Multi-Material Carbon Fiber Printers.</p>
              <button
                onClick={() => onOpenBookingModal('Additive Manufacturing')}
                className="text-amber-400 font-semibold text-xs hover:underline block pt-2"
              >
                Reserve Slot →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Bay 02</span>
              <h3 className="text-lg font-bold text-white">CNC Precision Milling</h3>
              <p className="text-slate-400 text-sm">5-Axis Subtractive CNC Router, Lathes, Precision Metal &amp; Wood Cutting.</p>
              <button
                onClick={() => onOpenBookingModal('CNC Subtractive Machining')}
                className="text-amber-400 font-semibold text-xs hover:underline block pt-2"
              >
                Reserve Slot →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Bay 03</span>
              <h3 className="text-lg font-bold text-white">CO2 Laser Cutter &amp; Engraver</h3>
              <p className="text-slate-400 text-sm">High-speed 150W Laser Engraving for Acrylics, Sheet Metal, Wood &amp; Composites.</p>
              <button
                onClick={() => onOpenBookingModal('Laser Precision Cutting')}
                className="text-amber-400 font-semibold text-xs hover:underline block pt-2"
              >
                Reserve Slot →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Bay 04</span>
              <h3 className="text-lg font-bold text-white">SMD Electronics &amp; IoT Lab</h3>
              <p className="text-slate-400 text-sm">Pick-and-place PCB Assembly, Reflow Ovens, Oscilloscopes, Spectrum Analyzers.</p>
              <button
                onClick={() => onOpenBookingModal('Electronics Assembly')}
                className="text-amber-400 font-semibold text-xs hover:underline block pt-2"
              >
                Reserve Slot →
              </button>
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
