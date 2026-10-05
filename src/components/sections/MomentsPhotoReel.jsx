import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MomentsPhotoReel.css';

const MOMENTS_PHOTOS = [
  {
    id: 'photo-1',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    title: 'Founders Strategy Session',
    tag: 'IDEATION',
    desc: 'Student co-founders defining early stage tech architecture.',
  },
  {
    id: 'photo-2',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    title: 'Whiteboard Breakthrough',
    tag: 'BRAINSTORMING',
    desc: 'Translating complex research into market-ready SaaS models.',
  },
  {
    id: 'photo-3',
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    title: 'Mentorship & Advisory',
    tag: 'CONVERSATIONS',
    desc: '1-on-1 strategic feedback from domain experts and investors.',
  },
  {
    id: 'photo-4',
    src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    title: 'FabLab Prototyping',
    tag: 'HARDWARE',
    desc: 'Hands-on PCB assembly and rapid 3D printing in the lab.',
  },
  {
    id: 'photo-5',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    title: 'Startup Pitch Showcase',
    tag: 'FUNDING',
    desc: 'Presenting high-growth ventures to angel investor panels.',
  },
  {
    id: 'photo-6',
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
    title: 'Cohort Celebration',
    tag: 'MEMORIES',
    desc: 'Celebrating milestone achievements and seed investment wins.',
  },
  {
    id: 'photo-7',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    title: 'Midnight Coding Sprint',
    tag: 'EXECUTION',
    desc: 'Incubation teams building MVP features for launch day.',
  },
  {
    id: 'photo-8',
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    title: 'Ecosystem Summit',
    tag: 'COMMUNITY',
    desc: 'Connecting 500+ student innovators and industry leaders.',
  },
];

export default function MomentsPhotoReel() {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(null);
  
  // Scroll velocity boosting state
  const lastScrollYRef = useRef(0);
  const scrollBoostRef = useRef(0);

  // Touch swipe support for Lightbox
  const touchStartXRef = useRef(null);

  // Check reduced motion preference
  const isReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  );

  // 1. Intersection Observer for Entry Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Scroll Velocity Coupling
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;

      // Add temporary speed boost based on scroll velocity (max 1.8x boost)
      scrollBoostRef.current = Math.min(1.8, scrollBoostRef.current + deltaY * 0.015);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollBoostRef.current = 0;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // 3. Continuous Infinite Animation Loop (Right -> Left)
  useEffect(() => {
    if (isReducedMotion.current) return;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // in seconds
      lastTimeRef.current = timestamp;

      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth / 2; // Width of single sequence

        if (trackWidth > 0) {
          // Base speed ~ 32px / sec
          const baseSpeed = 32;
          
          // Gradually decay scroll boost towards 0
          scrollBoostRef.current *= 0.92;
          const currentSpeed = isHovered ? 0 : baseSpeed * (1 + scrollBoostRef.current);

          positionRef.current -= currentSpeed * deltaTime;

          // Infinite Seamless Loop Reset
          if (Math.abs(positionRef.current) >= trackWidth) {
            positionRef.current += trackWidth;
          }

          trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index % MOMENTS_PHOTOS.length);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % MOMENTS_PHOTOS.length : null));
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + MOMENTS_PHOTOS.length) % MOMENTS_PHOTOS.length : null
    );
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  // Touch swipe handlers for Lightbox
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) nextLightbox();
      else prevLightbox();
    }

    touchStartXRef.current = null;
  };

  // Combine sequence A & sequence B for seamless infinite looping
  const doublePhotos = [...MOMENTS_PHOTOS, ...MOMENTS_PHOTOS];

  return (
    <section
      ref={sectionRef}
      className="pierc-photo-reel"
      id="moments-photo-reel-section"
      aria-label="Moments That Move Us"
    >
      <div
        className={`pierc-photo-reel__reveal-wrapper ${
          isVisible ? 'pierc-photo-reel--visible' : ''
        }`}
      >
        {/* Header */}
        <div className="pierc-photo-reel__header">
          <div className="pierc-photo-reel__eyebrow">
            <span>●</span>
            <span>PIERC GALLERY</span>
          </div>
          <h2 className="pierc-photo-reel__title">MOMENTS THAT MOVE US</h2>
          <p className="pierc-photo-reel__subtitle">
            “People. Ideas. Conversations. Memories.”
          </p>
        </div>

        {/* Continuous Horizontal Strip Viewport */}
        <div
          className="pierc-photo-reel__viewport"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Vignette Edge Fades */}
          <div className="pierc-photo-reel__fade-left" aria-hidden="true" />
          <div className="pierc-photo-reel__fade-right" aria-hidden="true" />

          {/* Moving Track */}
          <div ref={trackRef} className="pierc-photo-reel__track-container">
            {doublePhotos.map((photo, idx) => (
              <div
                key={`${photo.id}-${idx}`}
                className="pierc-photo-reel__item"
                onClick={() => openLightbox(idx % MOMENTS_PHOTOS.length)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx % MOMENTS_PHOTOS.length);
                  }
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="pierc-photo-reel__img"
                  loading="lazy"
                />
                <div className="pierc-photo-reel__item-overlay" />
                <div className="pierc-photo-reel__item-caption">
                  <h3 className="pierc-photo-reel__item-title">{photo.title}</h3>
                  <span className="pierc-photo-reel__item-tag">{photo.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className={`pierc-lightbox ${
            lightboxIndex !== null ? 'pierc-lightbox--open' : ''
          }`}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
        >
          <div
            className="pierc-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="pierc-lightbox__close"
              onClick={closeLightbox}
              title="Close Lightbox"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              className="pierc-lightbox__btn pierc-lightbox__btn--prev"
              onClick={prevLightbox}
              title="Previous Photo"
              aria-label="Previous"
            >
              ←
            </button>

            {/* Main Image */}
            <div className="pierc-lightbox__img-wrapper">
              <img
                src={MOMENTS_PHOTOS[lightboxIndex].src}
                alt={MOMENTS_PHOTOS[lightboxIndex].title}
                className="pierc-lightbox__img"
              />
            </div>

            {/* Info Caption */}
            <div className="pierc-lightbox__info">
              <h3 className="pierc-lightbox__title">
                {MOMENTS_PHOTOS[lightboxIndex].title}
              </h3>
              <p className="pierc-lightbox__desc">
                {MOMENTS_PHOTOS[lightboxIndex].desc}
              </p>
            </div>

            {/* Next Button */}
            <button
              className="pierc-lightbox__btn pierc-lightbox__btn--next"
              onClick={nextLightbox}
              title="Next Photo"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
