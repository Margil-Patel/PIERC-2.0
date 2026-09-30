import React, { useState } from 'react';
import { flagshipPlatforms } from '../../data/ecosystemData';

export default function FlagshipsSection({ onSelectPlatform }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Annual Flagship', 'Build Challenge', 'Diversity & Scale', 'Hardware Innovation', 'Bio & MedTech', 'Next Gen'];

  const filteredPlatforms = selectedCategory === 'All'
    ? flagshipPlatforms
    : flagshipPlatforms.filter(p => p.category === selectedCategory);

  return (
    <section id="flagship-platforms" className="w-full bg-surface py-20 lg:py-28 border-b border-hairline-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Ecosystem Anchors</span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
              Western India's Flagship Platforms
            </h2>
            <p className="reveal-desc font-body-md text-base text-on-surface-variant max-w-xl leading-relaxed">
              High-density annual conventions convening tens of thousands of founders, investors, students, and institutional decision-makers.
            </p>
          </div>

          <div className="reveal-on-scroll flex items-center gap-2 font-label-code text-xs text-on-surface-variant bg-surface-card border border-hairline-light px-3 py-1.5 rounded-full">
            <span>Over 100+ Sessions Annually</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="reveal-on-scroll flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-label-caps text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-card border border-hairline-light text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Initiatives 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {filteredPlatforms.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-surface-card border border-hairline-light shadow-sm hover:shadow-xl hover:border-primary/40 transition-all space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-caps text-xs font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-label-code text-xs text-primary font-semibold mt-1">
                    {item.tagline}
                  </p>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="px-2 py-0.5 rounded-md bg-surface-container-low text-[11px] font-medium text-on-surface-variant">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-hairline-light/60 flex items-center justify-between font-label-code text-xs text-primary font-semibold">
                <button
                  onClick={() => onSelectPlatform(item)}
                  className="hover:underline flex items-center gap-1 group-hover:text-primary-container"
                >
                  <span>{item.badgeText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
