"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
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
        <div className="w-full mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
              // ARCHIVE // 2026 VISUAL LOG
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
              MOMENTS FROM TECHFEST
            </h2>
          </div>
          <Link
            href="/gallery"
            className="px-4 py-2 rounded-xl border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300 font-mono text-xs tracking-wider transition-all self-start sm:self-end flex items-center gap-1.5"
          >
            <span>VIEW FULL GALLERY</span>
            <span>↗</span>
          </Link>
        </div>

        {/* Gallery Stream: Horizontal drag/scroll on mobile, scroll-driven on desktop */}
        <div
          ref={trackRef}
          className="flex items-center gap-10 sm:gap-16 overflow-x-auto md:overflow-visible no-scrollbar pb-6 md:pb-0 will-change-transform transition-transform duration-100 ease-out snap-x snap-mandatory md:snap-none"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <Link
              key={item.id}
              href="/gallery"
              data-cursor="VIEW"
              className="shrink-0 w-[85vw] sm:w-[55vw] md:w-[42vw] max-w-xl space-y-4 cursor-pointer group snap-center block"
            >
              {/* Large Image Frame with subtle hover */}
              <div className="relative aspect-[16/10] bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/videos/hero/earth-zoom-drone-poster.jpg";
                    }}
                  />
                ) : (
                  <span className="text-5xl sm:text-7xl font-extralight text-neutral-800 tracking-tighter select-none font-mono group-hover:text-neutral-600 transition-colors">
                    0{idx + 1}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061226]/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-white font-mono text-[10px] backdrop-blur-xs">
                  ARCHIVE // 0{idx + 1}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] backdrop-blur-xs font-bold">
                  {item.category}
                </div>
              </div>

              {/* Caption */}
              <div className="flex items-start justify-between gap-4 pt-1">
                <div>
                  <h3 className="text-sm sm:text-base font-light text-white tracking-wide font-sans group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5 font-mono">
                    {item.sub}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                  {item.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
