import React, { useState } from 'react';
import { boardOfGovernors, operatingLeadership } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function LeadershipSection({ onOpenMentorModal }) {
  // Mobile state: toggle individual governor bio expansion
  const [expandedBios, setExpandedBios] = useState({});

  const toggleBio = (id) => {
    setExpandedBios((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="leadership-governance"
      className="w-full bg-surface py-12 md:py-20 lg:py-28 border-b border-hairline-light"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================================
            MOBILE SECTION HEADER (< 768px): Stacked & Compact
            ================================================================== */}
        <div className="flex flex-col md:hidden mb-8 space-y-3">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-2.5">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Institutional Stewardship</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight mt-1">
              Governing Leadership &amp; Operating Team
            </h2>
          </div>
          <div>
            <button
              type="button"
              onClick={() => onOpenMentorModal && onOpenMentorModal()}
              className="inline-flex items-center gap-1.5 font-body-sm text-sm text-primary font-semibold hover:underline active:opacity-80 cursor-pointer"
            >
              <span>Join Mentorship Network</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            DESKTOP SECTION HEADER (>= 768px): Row Layout (Preserved)
            ================================================================== */}
        <div className="hidden md:flex md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Institutional Stewardship</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight mt-1">
              Governing Leadership &amp; Operating Team
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenMentorModal && onOpenMentorModal()}
            className="reveal-on-scroll inline-flex items-center gap-2 font-body-sm text-sm text-primary font-semibold hover:underline self-start md:self-auto cursor-pointer"
          >
            <span>Join Mentorship Network</span>
            <span>→</span>
          </button>
        </div>

        {/* ==================================================================
            BOARD OF GOVERNORS SECTION
            ================================================================== */}
        <div className="mb-12 md:mb-16">
          <h3 className="font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-4 md:mb-6">
            Board of Governors
          </h3>

          {/* Desktop & Tablet Grid (>= 768px) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 reveal-stagger">
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

          {/* Mobile Single-Column Compact Horizontal Profile Cards (< 768px) */}
          <div className="flex flex-col space-y-3.5 md:hidden">
            {boardOfGovernors.map((gov, idx) => {
              const cardId = gov.id || idx;
              const isExpanded = !!expandedBios[cardId];
              const isHighlighted = gov.name.includes('Parul Patel');

              return (
                <div
                  key={cardId}
                  className={`flex items-start gap-3 p-3.5 rounded-[18px] bg-white transition-all duration-300 ${
                    isHighlighted
                      ? 'border-2 border-primary/60 shadow-md shadow-pink-100/70'
                      : 'border border-pink-100/90 shadow-2xs hover:border-pink-200'
                  }`}
                >
                  {/* Left: Rounded-square Profile Photograph */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-[16px] bg-[#FFF0F3] border border-pink-100/80 overflow-hidden flex items-center justify-center text-primary font-bold text-base shrink-0 shadow-2xs">
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
                      <span>{gov.initials}</span>
                    )}
                  </div>

                  {/* Subtle Vertical Pink Divider */}
                  <div
                    className="w-[1px] bg-pink-200/70 self-stretch my-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  {/* Right: Profile Information */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface leading-snug">
                      {gov.name}
                    </h4>
                    <span className="font-label-code text-[11px] sm:text-xs text-primary font-semibold block mt-0.5 leading-tight">
                      {gov.role}
                    </span>

                    {/* Biography with Expand / Collapse */}
                    <div className="mt-1">
                      <p
                        className={`font-body-sm text-[11.5px] sm:text-xs text-on-surface-variant leading-relaxed ${
                          !isExpanded ? 'line-clamp-2' : ''
                        }`}
                      >
                        {gov.bio}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleBio(cardId)}
                        className="text-primary font-semibold text-[11.5px] hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer active:opacity-70"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? 'Read less ↑' : 'Read bio →'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            OPERATING INCUBATION LEADERSHIP SECTION
            ================================================================== */}
        <div>
          {/* Desktop & Tablet Container (>= 768px) */}
          <div className="hidden md:block p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-md reveal-on-scroll">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-6">
              Operating Incubation Leadership
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 reveal-stagger">
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

          {/* Mobile Compact Two-Column Grid (< 768px) */}
          <div className="md:hidden">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-outline font-bold mb-4">
              Operating Incubation Leadership
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {operatingLeadership.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="relative flex items-start gap-2 p-2.5 rounded-[16px] bg-[#FFF1F3] border border-pink-100/80 shadow-2xs"
                >
                  {/* Left: Profile Photograph */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white overflow-hidden shrink-0 border border-pink-200/70 shadow-2xs mt-0.5">
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
                      <div className="w-full h-full flex items-center justify-center text-primary font-bold text-xs">
                        {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h5 className="font-headline-sm text-xs sm:text-[12.5px] font-bold text-on-surface leading-snug break-words">
                      {member.name}
                    </h5>
                    <span className="font-label-code text-[10px] sm:text-[10.5px] text-primary font-semibold block leading-tight mt-0.5 break-words">
                      {member.role}
                    </span>
                  </div>

                  {/* Top-Right: LinkedIn Icon Button */}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 border border-pink-200/60 flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-colors shrink-0 shadow-2xs"
                      title={`${member.name} on LinkedIn`}
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
