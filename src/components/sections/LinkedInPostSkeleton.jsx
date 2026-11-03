import React from 'react';

export default function LinkedInPostSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-surface-card border border-hairline-light shadow-2xs flex flex-col justify-between h-[440px] animate-pulse select-none"
        >
          {/* Skeleton Header & Image */}
          <div className="space-y-4">
            {/* Image Placeholder */}
            <div className="w-full h-48 sm:h-52 rounded-xl bg-surface-container-high/60" />

            {/* Author Branding Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-high/70 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-surface-container-high/80 rounded w-24" />
                <div className="h-2.5 bg-surface-container-high/50 rounded w-16" />
              </div>
              <div className="w-5 h-5 rounded bg-surface-container-high/50" />
            </div>

            {/* Post Content Skeleton Lines */}
            <div className="space-y-2 pt-1">
              <div className="h-3 bg-surface-container-high/70 rounded w-full" />
              <div className="h-3 bg-surface-container-high/70 rounded w-5/6" />
              <div className="h-3 bg-surface-container-high/70 rounded w-4/5" />
              <div className="h-3 bg-surface-container-high/50 rounded w-2/3" />
            </div>
          </div>

          {/* Skeleton CTA Footer */}
          <div className="pt-4 border-t border-hairline-light/80 flex items-center justify-between">
            <div className="h-3 bg-surface-container-high/70 rounded w-28" />
            <div className="w-4 h-4 rounded bg-surface-container-high/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
