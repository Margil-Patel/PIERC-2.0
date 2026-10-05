import React, { useState, useEffect, useRef } from 'react';
import { ecosystemMetrics } from '../../data/ecosystemData';
import ParallaxCard from '../common/ParallaxCard';

export default function MetricsRibbon() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState(
    ecosystemMetrics.map(() => '0')
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run count-up animation only after the section becomes visible
  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible]);

  return (
    <section
      id="impact-metrics"
      ref={sectionRef}
      className="w-full bg-surface-container-low py-12 border-b border-hairline-light overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-hairline-light gap-2">
          <div>
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-xs flex items-center gap-3">
              <span className="reveal-eyebrow-line bg-primary" />
              <span>Institutional Accountability</span>
            </div>
            <h2 className="reveal-heading font-headline-md text-headline-md text-on-surface font-bold mt-1">
              Audited Ecosystem Impact Since Inception
            </h2>
          </div>
          <span className="reveal-on-scroll font-label-code text-xs text-on-surface-variant bg-surface-card px-3 py-1.5 rounded-full border border-hairline-light self-start sm:self-auto">
            Section 8 Compliant • Updated Q1 2026
          </span>
        </div>

        {/* 6-Grid Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
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

      </div>
    </section>
  );
}
