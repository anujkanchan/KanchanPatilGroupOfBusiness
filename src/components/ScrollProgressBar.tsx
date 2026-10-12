import React, { useState, useEffect } from 'react';

/**
 * ScrollProgressBar
 * A thin, gold-colored luxury progress bar pinned to the very top of the viewport (z-[60])
 * that fills dynamically and smoothly as the user scrolls down the page.
 */
export const ScrollProgressBar: React.FC = () => {
  const barRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (barRef.current) {
        const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none bg-black/20 backdrop-blur-[1px]"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#8a6820] via-[#D4AF37] via-[#FFF3B0] to-[#DFBA48] shadow-[0_0_10px_rgba(212,175,55,0.7),0_0_20px_rgba(212,175,55,0.4)] relative will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      >
        {/* Subtle trailing gold ember / light point at the tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFBEA] shadow-[0_0_8px_2px_rgba(255,243,176,0.9)] opacity-90" />
      </div>
    </div>
  );
};
