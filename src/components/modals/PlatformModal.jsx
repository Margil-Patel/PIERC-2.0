import React from 'react';

export default function PlatformModal({ platform, isOpen, onClose, onRegister }) {
  if (!isOpen || !platform) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-deep/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface-card border border-hairline-light rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-graphite-deep text-canvas-light px-6 py-6 border-b border-graphite-border relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-graphite-surface hover:bg-graphite-border text-canvas-light flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <span className="px-3 py-1 rounded-full bg-primary/30 border border-primary/50 text-electric-glow font-label-caps text-xs uppercase font-semibold">
            {platform.category}
          </span>

          <h3 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-canvas-light mt-3">
            {platform.title}
          </h3>
          <p className="font-label-code text-xs text-electric-glow mt-1 font-semibold">
            {platform.tagline}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="font-label-caps text-xs uppercase tracking-wider text-outline font-bold mb-2">
              Platform Overview &amp; Mandate
            </h4>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              {platform.description}
            </p>
          </div>

          <div>
            <h4 className="font-label-caps text-xs uppercase tracking-wider text-outline font-bold mb-3">
              Key Metrics &amp; Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {platform.highlights.map((h, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-surface-container-low border border-hairline-light">
                  <span className="font-label-code text-xs text-primary font-bold block">0{idx + 1}</span>
                  <p className="font-body-sm text-xs text-on-surface font-semibold mt-1">{h}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container border border-hairline-light space-y-1">
            <span className="font-label-caps text-[11px] text-primary font-bold uppercase tracking-wider">
              Host Campus &amp; Infrastructure
            </span>
            <p className="text-xs text-on-surface-variant">
              Central Auditorium &amp; Incubation Labs, Parul University, Vadodara, Gujarat.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onRegister) onRegister(platform.title);
              }}
              className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all shadow-md"
            >
              Register for {platform.title} →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
