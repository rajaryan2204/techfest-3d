"use client";

import React, { useRef, useEffect } from "react";
import { GALLERY_ITEMS } from "@/data/festData";

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollDistance = rect.height - windowHeight;
      const currentScroll = -rect.top;

      if (currentScroll >= 0 && currentScroll <= totalScrollDistance) {
        const progress = currentScroll / totalScrollDistance;
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth + 120;
        trackRef.current.style.transform = `translate3d(-${progress * Math.max(0, maxTranslate)}px, 0, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="gallery-section"
      ref={containerRef}
      className="relative z-20 w-full md:h-[220vh] text-white border-b border-white/10"
    >
      {/* Desktop Sticky Container / Mobile Normal Flow */}
      <div className="md:sticky md:top-0 md:h-screen w-full overflow-hidden flex flex-col justify-center py-20 md:py-0 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="w-full mb-8 sm:mb-12 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
            // ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
            MOMENTS FROM TECHFEST
          </h2>
        </div>

        {/* Gallery Stream: Horizontal drag/scroll on mobile, scroll-driven on desktop */}
        <div
          ref={trackRef}
          className="flex items-center gap-10 sm:gap-16 overflow-x-auto md:overflow-visible no-scrollbar pb-6 md:pb-0 will-change-transform transition-transform duration-100 ease-out snap-x snap-mandatory md:snap-none"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              data-cursor="VIEW"
              className="shrink-0 w-[85vw] sm:w-[55vw] md:w-[42vw] max-w-xl space-y-4 cursor-pointer group snap-center"
            >
              {/* Large Image Frame with subtle hover */}
              <div className="relative aspect-[16/10] bg-[#0c0c0e] border border-white/10 overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:border-white/30">
                <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
                <span className="text-5xl sm:text-7xl font-extralight text-neutral-800 tracking-tighter select-none font-mono group-hover:text-neutral-600 transition-colors">
                  0{idx + 1}
                </span>
              </div>

              {/* Caption */}
              <div className="flex items-start justify-between gap-4 pt-1">
                <div>
                  <h3 className="text-sm sm:text-base font-light text-white tracking-wide font-sans group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {item.sub}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
