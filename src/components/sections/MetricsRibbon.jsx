import React, { useState, useEffect, useRef } from 'react';
import { ecosystemMetrics } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function MetricsRibbon() {
  const sectionRef = useRef(null);

  const checkReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isReduced = checkReducedMotion();

  const [isVisible, setIsVisible] = useState(isReduced);
  const [displayValues, setDisplayValues] = useState(() =>
    isReduced ? ecosystemMetrics.map((m) => m.value) : ecosystemMetrics.map(() => '0')
  );

  useEffect(() => {
    if (isReduced) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReduced]);

  // Run count-up animation only after the section becomes visible
  useEffect(() => {
    if (!isVisible || isReduced) return;

    let startTimestamp = null;
    const duration = 1600;

    const parseNumeric = (valStr) => {
      const num = parseFloat(valStr.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const targets = ecosystemMetrics.map((m) => ({
      raw: m.value,
      num: parseNumeric(m.value),
      isDecimal: m.value.includes('.'),
      prefix: m.value.startsWith('₹') ? '₹' : '',
    }));

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayValues(
        targets.map((t) => {
          const current = t.num * ease;
          if (t.isDecimal) {
            return `${t.prefix}${current.toFixed(1)}`;
          }
          return `${t.prefix}${Math.floor(current)}`;
        })
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValues(targets.map((t) => t.raw));
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isVisible, isReduced]);

  return (
    <section
      id="impact-metrics"
      ref={sectionRef}
      className="w-full bg-[#FFF4F6] py-10 sm:py-12 md:py-14 border-b border-[#f7e6e9] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Centered on Mobile, Row on Desktop/Tablet */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left mb-6 md:mb-8 pb-0 md:pb-4 border-b-0 md:border-b md:border-hairline-light gap-2.5 md:gap-2">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-5 h-[2px] bg-primary rounded-full md:hidden inline-block" />
              <span className="reveal-eyebrow-line bg-primary hidden md:inline-block" />
              <span>Institutional Accountability</span>
            </div>
            <h2 className="reveal-heading font-headline-md text-2xl md:text-headline-md text-on-surface font-bold mt-1.5 md:mt-1 leading-snug">
              Audited Ecosystem Impact Since Inception
            </h2>
          </div>
          <span className="reveal-on-scroll font-label-code text-[11px] md:text-xs text-on-surface-variant bg-surface-card px-3.5 py-1.5 rounded-full border border-hairline-light shadow-sm self-center md:self-auto">
            Section 8 Compliant • Updated Q1 2026
          </span>
        </div>

        {/* Desktop (1024px+) 6-Column Grid & Tablet (768px-1023px) 2/3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {ecosystemMetrics.map((metric, idx) => (
            <ParallaxCard
              key={idx}
              index={idx}
              className="p-5 rounded-2xl bg-surface-card border border-hairline-light shadow-sm hover:border-primary/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
                  {metric.category}
                </span>
                <div className="font-metric-display text-4xl sm:text-5xl font-extrabold text-primary mt-2 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                  {displayValues[idx]}
                  {metric.suffix && <span className="text-2xl font-bold ml-0.5">{metric.suffix}</span>}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline-light/60">
                <p className="font-body-sm text-xs text-on-surface font-semibold leading-snug">
                  {metric.title}
                </p>
                <p className="font-body-sm text-[11px] text-outline mt-1 leading-normal">
                  {metric.description}
                </p>
              </div>
            </ParallaxCard>
          ))}
        </div>

        {/* Mobile (below 768px) Vertical Impact List */}
        <div className="flex flex-col gap-3 md:hidden reveal-stagger">
          {ecosystemMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="w-full bg-[#FFFFFF] rounded-[20px] border border-[#fce2e6] shadow-[0_2px_10px_rgba(225,29,72,0.04)] px-4 py-3.5 flex items-center min-h-[74px] transition-all duration-200 active:scale-[0.99] hover:border-primary/30"
            >
              {/* Left side: Large, bold, pink/red statistic number */}
              <div className="w-[104px] sm:w-[120px] flex-shrink-0 flex items-baseline justify-center">
                <span className="font-metric-display text-[25px] sm:text-[28px] font-extrabold text-primary tracking-tight leading-none">
                  {displayValues[idx]}
                </span>
                {metric.suffix && (
                  <span className="font-metric-display text-sm sm:text-base font-bold text-primary ml-1 leading-none">
                    {metric.suffix}
                  </span>
                )}
              </div>

              {/* Subtle vertical divider between number and description */}
              <div className="w-px h-9 bg-[#f0d5db] mx-3 sm:mx-4 flex-shrink-0 self-center" />

              {/* Right side: Category title in uppercase and short description */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="font-label-caps text-[11px] font-extrabold uppercase tracking-wider text-[#191216] leading-none mb-1 block">
                  {metric.category}
                </span>
                <p className="font-body-sm text-xs font-medium text-[#644047] leading-tight">
                  {metric.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
