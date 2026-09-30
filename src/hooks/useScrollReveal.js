import { useEffect } from 'react';

/**
 * Bulletproof, high-performance scroll reveal hook.
 * Uses IntersectionObserver with fallback scroll handler and instant viewport detection.
 * Ensures that ALL data and elements are visible and smoothly animated into view,
 * and never left hidden.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selector =
      '.reveal-on-scroll, .reveal-up, .reveal-heading, .reveal-eyebrow, .reveal-desc, .reveal-p, .reveal-image, .reveal-clip, .reveal-stagger, .reveal-cta-words, .reveal-ecosystem';

    const checkAndReveal = () => {
      const elements = document.querySelectorAll(selector);
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains('is-revealed')) return;
        const rect = el.getBoundingClientRect();
        // If element is in viewport or above the bottom threshold
        if (rect.top <= windowHeight * 0.92) {
          el.classList.add('is-revealed');
        }
      });
    };

    // 1. Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // 2. Immediate check for elements already in viewport on load
    checkAndReveal();

    // 3. Setup IntersectionObserver
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px 50px 0px',
          threshold: [0, 0.05, 0.1],
        }
      );

      document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    }

    // 4. Fallback scroll and resize listeners for 100% guarantee
    const onScroll = () => {
      requestAnimationFrame(checkAndReveal);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // 5. Subsequent interval checks to catch dynamic layout shifts / late renders
    const timer1 = setTimeout(checkAndReveal, 100);
    const timer2 = setTimeout(checkAndReveal, 300);
    const timer3 = setTimeout(checkAndReveal, 800);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
}

export default useScrollReveal;
