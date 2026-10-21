import React, { useState } from 'react';
import ParallaxCard from '../common/ParallaxCard';

export default function LinkedInPostCard({ post, index = 0 }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = post?.imageUrl && !imageError;

  return (
    <ParallaxCard
      index={index}
      className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-hairline-light shadow-2xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer select-none overflow-hidden"
      onClick={() => window.open(post.postUrl, '_blank', 'noopener,noreferrer')}
    >
      <div className="space-y-4">
        {/* 1. LinkedIn Post Image Container */}
        <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-surface-container border border-hairline-light/60 shrink-0">
          {hasImage ? (
            <img
              src={post.imageUrl}
              alt="PIERC LinkedIn Update"
              onError={() => setImageError(true)}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
          ) : (
            /* Visually consistent Fallback design when post has no image */
            <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container-low p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              {/* Subtle background decorative shapes */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary/10 blur-xl pointer-events-none" />
              <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-secondary/10 blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-primary font-bold px-2.5 py-1 rounded-full bg-surface-card/80 backdrop-blur-sm border border-hairline-light">
                  PIERC Update
                </span>
                {/* LinkedIn Badge */}
                <span className="w-6 h-6 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                  in
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <span className="font-headline-sm text-lg font-extrabold text-on-surface tracking-tight block">
                  Parul Innovation &amp; Entrepreneurship
                </span>
                <span className="font-label-code text-xs text-on-surface-variant font-medium block">
                  Research Centre Official Dispatch
                </span>
              </div>
            </div>
          )}

          {/* Overlay Tag for LinkedIn Branding when image is present */}
          {hasImage && (
            <div className="absolute top-3 right-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-surface-card/90 backdrop-blur-md text-[#0A66C2] flex items-center justify-center shadow-sm border border-hairline-light">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.66a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* 2. PIERC Branding & Meta */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center p-1 border border-hairline-light shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UbvtsGiSYqRYgryRgeI3-qIBfqxqSA2VQCauLRbtoKc2aZdFtjJbMq8Rb9Sn-4dlWB8kn_iACGfUPukOQpyEoVCBuJK0y_B5rLKlDHjdDlZ0hafmM5A-vFXiBTK-40HHWDk1xqaiC1w0CW-XKOIuxylkaWxcTpAY8ZMzLiv6Jj8xbvZip5F8xFf8uFeUh5n7wqPtlOCfzeMLR_N4MyYXyKBD_PEc_axvdewfE-WnqjOInRBRMKeCNTBfI"
              alt="PIERC Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-sm font-bold text-on-surface truncate">
                {post.authorName || 'PIERC'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            </div>
            <span className="font-label-code text-[11px] text-on-surface-variant font-medium block">
              {post.publishedAt}
            </span>
          </div>
        </div>

        {/* 3. Post Content (Truncated cleanly) */}
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-4 min-h-[4.5rem]">
          {post.text}
        </p>
      </div>

      {/* 4. CTA */}
      <div className="pt-4 border-t border-hairline-light/80 mt-4 flex items-center justify-between">
        <span className="font-label-caps text-[11px] uppercase tracking-wider font-semibold text-primary group-hover:text-primary-container transition-colors flex items-center gap-1.5">
          Read on LinkedIn
        </span>
        <span className="text-primary font-bold text-base transition-transform duration-300 ease-out group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </ParallaxCard>
  );
}
