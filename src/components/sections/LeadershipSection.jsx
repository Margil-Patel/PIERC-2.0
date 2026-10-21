import React from 'react';
import { boardOfGovernors, operatingLeadership } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function LeadershipSection({ onOpenMentorModal }) {
  return (
    <section id="leadership-governance" className="w-full bg-surface py-20 lg:py-28 border-b border-hairline-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Institutional Stewardship</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
              Governing Leadership &amp; Operating Team
            </h2>
          </div>
          <button
            onClick={() => onOpenMentorModal()}
            className="reveal-on-scroll inline-flex items-center gap-2 font-body-sm text-sm text-primary font-semibold hover:underline self-start md:self-auto"
          >
            <span>Join Mentorship Network</span>
            <span>→</span>
          </button>
        </div>

        {/* Board of Governors Grid */}
        <div className="mb-16">
          <h3 className="reveal-on-scroll font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-6">
            Board of Governors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardOfGovernors.map((gov, idx) => (
              <ParallaxCard
                key={gov.id || idx}
                index={idx}
                className="p-6 rounded-3xl bg-surface-card border border-hairline-light shadow-sm hover:border-primary/40 space-y-4 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface-container overflow-hidden flex items-center justify-center text-primary font-headline-md text-2xl font-extrabold shadow-inner shrink-0 border border-hairline-light">
                  {gov.image ? (
                    <img
                      src={gov.image}
                      alt={gov.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    gov.initials
                  )}
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                    {gov.name}
                  </h4>
                  <span className="font-label-code text-xs text-primary font-semibold block mt-0.5">
                    {gov.role}
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2.5 leading-relaxed line-clamp-3">
                    {gov.bio}
                  </p>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>

        {/* Operating Team Execution Ribbon */}
        <div className="p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-md reveal-on-scroll">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-outline font-bold">
              Operating Incubation Leadership ({operatingLeadership.length} Members)
            </h3>
            <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">
              Limda HQ • Surat Studio • Ahmedabad Studio
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {operatingLeadership.map((member, idx) => (
              <ParallaxCard
                key={member.id || idx}
                index={idx}
                className="space-y-1 p-3.5 rounded-2xl bg-surface-container-low border border-hairline-light/60 hover:border-primary/40 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-11 h-11 rounded-xl bg-surface-container overflow-hidden flex items-center justify-center text-primary font-bold text-xs shrink-0 border border-hairline-light shadow-xs">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        member.initials || member.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-lg bg-surface-container hover:bg-[#0077b5] text-on-surface-variant hover:text-white flex items-center justify-center transition-colors shadow-xs"
                        title={`${member.name} on LinkedIn`}
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <h5 className="font-headline-sm text-sm font-bold text-on-surface leading-snug">
                    {member.name}
                  </h5>
                </div>
                <div className="pt-1">
                  <span className="font-label-code text-[11px] text-primary font-semibold block leading-tight">
                    {member.role}
                  </span>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
