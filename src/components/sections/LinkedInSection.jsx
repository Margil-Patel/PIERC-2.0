import React, { useState, useEffect } from 'react';
import { getLatestPosts } from '../../services/linkedinService';
import LinkedInPostCard from './LinkedInPostCard';
import LinkedInPostSkeleton from './LinkedInPostSkeleton';

export default function LinkedInSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchLinkedInData() {
      try {
        setLoading(true);
        setError(false);
        const data = await getLatestPosts();
        if (isMounted) {
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            setPosts([]);
          }
        }
      } catch (err) {
        console.error('LinkedInSection Error:', err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLinkedInData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFollowClick = () => {
    window.open('https://www.linkedin.com/company/pierc-parul-university/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="latest-from-pierc" className="w-full bg-surface py-16 lg:py-24 border-b border-hairline-light select-none overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="reveal-eyebrow font-label-caps uppercase tracking-widest text-primary font-semibold text-[11px] flex items-center gap-2.5">
              <span className="reveal-eyebrow-line bg-primary w-6 h-[2px] rounded-full" />
              <span>LATEST UPDATES</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container text-[#0A66C2] font-label-code text-[10px] font-bold border border-hairline-light ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Official LinkedIn Page Sync
              </span>
            </div>
            <h2 className="reveal-heading font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">
              Latest from PIERC
            </h2>
            <p className="reveal-desc font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Real-time updates directly from Parul Innovation &amp; Entrepreneurship Research Centre LinkedIn Page.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleFollowClick}
              className="reveal-on-scroll inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container hover:bg-[#0A66C2] hover:text-white text-primary transition-all duration-300 font-label-caps text-xs uppercase tracking-wider font-semibold shadow-2xs group border border-hairline-light active:scale-95"
            >
              <svg className="w-4 h-4 fill-current text-[#0A66C2] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.66a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
              </svg>
              <span>Follow PIERC on LinkedIn</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Body */}
        {loading ? (
          <LinkedInPostSkeleton count={3} />
        ) : error ? (
          /* Error State Fallback */
          <div className="p-8 sm:p-12 rounded-2xl bg-surface-card border border-hairline-light text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary mx-auto">
              <span className="material-symbols-outlined text-[24px]">wifi_off</span>
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">
              Unable to load the latest updates right now.
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              Please check back later or visit our official LinkedIn page directly.
            </p>
            <button
              onClick={handleFollowClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
            >
              Visit PIERC on LinkedIn →
            </button>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State Fallback */
          <div className="p-8 sm:p-12 rounded-2xl bg-surface-card border border-hairline-light text-center max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mx-auto">
              <span className="material-symbols-outlined text-[24px]">feed</span>
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">
              No recent updates yet.
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              Check back soon for new announcements and highlights from PIERC.
            </p>
          </div>
        ) : (
          /* Desktop & Tablet & Mobile Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 items-stretch">
            {posts.slice(0, 3).map((post, idx) => (
              <LinkedInPostCard key={post.id || idx} post={post} index={idx} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
