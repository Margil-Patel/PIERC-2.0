import React from 'react';
import { boardOfGovernors, operatingLeadership } from '../../data/ecosystemData';

export default function LeadershipSection({ onOpenMentorModal }) {
  return (
    <section id="leadership-governance" className="w-full bg-surface py-20 lg:py-28 border-b border-hairline-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex flex-col md:hidden mb-8 space-y-4">
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
            className="inline-flex items-center gap-2 font-body-sm text-sm text-primary font-semibold hover:underline"
          >
            <span>Join Mentorship Network</span>
            <span>→</span>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 hidden md:flex">
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

        {/* Board of Governors */}
        <div className="mb-16">
          <h3 className="reveal-on-scroll font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-6">
            Board of Governors
          </h3>
          {/* Desktop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger hidden md:grid">
            {boardOfGovernors.map((gov, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-surface-card border border-hairline-light shadow-sm hover:shadow-lg hover:border-primary/40 transition-all space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary font-headline-md text-2xl font-extrabold shadow-inner">
                  {gov.initials}
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                    {gov.name}
                  </h4>
                  <span className="font-label-code text-xs text-primary font-semibold block mt-0.5">
                    {gov.role}
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2.5 leading-relaxed">
                    {gov.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile Compact Cards */}
          <div className="flex flex-col space-y-4 md:hidden">
            {boardOfGovernors.map((gov, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-[18px] bg-white border ${gov.name.includes('Parul') ? 'border-primary' : 'border-pink-100'} shadow-sm`}
              >
                <div className="bg-[#FFF0F3] rounded-md w-10 h-10 flex items-center justify-center text-primary font-bold">
                  {gov.initials}
                </div>
                <div className="border-l border-pink-200 h-full mx-2"></div>
                <div className="flex-1">
                  <h4 className="font-headline-sm text-base font-bold text-on-surface">
                    {gov.name}
                  </h4>
                  <span className="font-label-code text-xs text-primary font-semibold block mt-0.5">
                    {gov.role}
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {gov.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Leadership */}
        <div className="p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-md reveal-on-scroll">
          <h3 className="font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-6">
            Operating Incubation Leadership
          </h3>
          {/* Desktop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 reveal-stagger hidden md:grid">
            {operatingLeadership.map((member, idx) => (
              <div key={idx} className="space-y-1 p-3 rounded-2xl bg-surface-container-low border border-hairline-light/60">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-xs mb-2">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h5 className="font-headline-sm text-sm font-bold text-on-surface">
                  {member.name}
                </h5>
                <span className="font-label-code text-xs text-primary font-semibold block">
                  {member.role}
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant block mt-1">
                  {member.domain}
                </span>
              </div>
            ))}
          </div>
          {/* Mobile Compact Grid */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {operatingLeadership.map((member, idx) => (
              <div key={idx} className="bg-[#FFF1F3] rounded-[16px] p-3 flex flex-col gap-1 shadow-sm">
                <div className="bg-[#FFF0F3] rounded-md w-8 h-8 flex items-center justify-center text-primary font-bold text-xs mb-1">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h5 className="font-headline-sm text-sm font-bold text-on-surface">
                  {member.name}
                </h5>
                <span className="font-label-code text-xs text-primary font-semibold block">
                  {member.role}
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant block">
                  {member.domain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
