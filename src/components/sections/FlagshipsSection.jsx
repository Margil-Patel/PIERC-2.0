import React, { useState } from 'react';
import { flagshipPlatforms } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function FlagshipsSection({ onSelectPlatform }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Annual Flagship', 'Build Challenge', 'Diversity & Scale', 'Hardware Innovation', 'Bio & MedTech', 'Next Gen'];

  const filteredPlatforms = selectedCategory === 'All'
    ? flagshipPlatforms
    : flagshipPlatforms.filter(p => p.category === selectedCategory);

  return (
    <section id="flagship-platforms" className="w-full bg-surface py-12 lg:py-18 border-b border-hairline-light select-none overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-[11px] flex items-center gap-2.5">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Ecosystem Anchors</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
              Western India's Flagship Platforms
            </h2>
            <p className="reveal-desc font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
              High-density annual conventions convening tens of thousands of founders, investors, students, and institutional decision-makers.
            </p>
          </div>

          <div className="reveal-on-scroll flex items-center gap-2 font-label-code text-[11px] text-on-surface-variant bg-surface-card border border-hairline-light px-3 py-1 rounded-full">
            <span>Over 100+ Sessions Annually</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="reveal-on-scroll flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-label-caps text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'bg-surface-card border border-hairline-light text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Initiatives 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredPlatforms.map((item, idx) => (
            <ParallaxCard
              key={item.id}
              index={idx}
              className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-hairline-light shadow-2xs hover:border-primary/40 transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caps text-[10px] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-label-code text-xs text-primary font-semibold mt-0.5">
                    {item.tagline}
                  </p>
                </div>

                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="px-2 py-0.5 rounded-md bg-surface-container-low text-[10px] font-medium text-on-surface-variant">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-hairline-light/60 flex items-center justify-between font-label-code text-xs text-primary font-semibold">
                <button
                  onClick={() => onSelectPlatform(item)}
                  className="hover:underline flex items-center gap-1 group-hover:text-primary-container"
                >
                  <span>{item.badgeText}</span>
                </button>
              </div>
            </ParallaxCard>
          ))}
        </div>

      </div>
    </section>
  );
}
