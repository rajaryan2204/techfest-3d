"use client";

import React, { useRef, useState, useEffect } from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import EventsStageCanvas from "./EventsStageCanvas";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function EventsStageExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const vh = window.innerHeight;
      const centerY = vh * 0.5;

      // Check each section's distance from viewport center
      let currentProgress = 0;
      let closestIdx = 0;
      let minDistance = Infinity;

      EDITORIAL_EVENTS.forEach((_, idx) => {
        const el = document.getElementById(`domain-section-${idx}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height * 0.5;
          const distFromCenter = Math.abs(elCenter - centerY);

          if (distFromCenter < minDistance) {
            minDistance = distFromCenter;
            closestIdx = idx;
          }
        }
      });

      // Calculate continuous progress across the 6 sections
      const firstSection = document.getElementById("domain-section-0");
      const lastSection = document.getElementById("domain-section-5");
      if (firstSection && lastSection) {
        const firstTop = firstSection.getBoundingClientRect().top;
        const totalHeight = (lastSection.getBoundingClientRect().bottom - firstTop) - vh;
        if (totalHeight > 0) {
          const rawFraction = Math.max(0, Math.min(1, -firstTop / totalHeight));
          currentProgress = rawFraction * 5.0;
        }
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollProgress(currentProgress);
        setActiveIdx(closestIdx);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToDomain = (idx: number) => {
    const el = document.getElementById(`domain-section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="events-track"
      ref={containerRef}
      className="relative w-full bg-[#070709] text-white"
    >
      {/* 1. STICKY BACKGROUND 3D CANVAS (Pinned across all 6 real DOM sections) */}
      <div className="sticky top-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
        <EventsStageCanvas scrollProgress={scrollProgress} />
      </div>

      {/* 2. REAL DOM SECTIONS (Occupies genuine vertical viewport space) */}
      <div className="relative z-20 -mt-[100vh]">
        {EDITORIAL_EVENTS.map((event, idx) => (
          <div
            key={event.id}
            id={`domain-section-${idx}`}
            className="min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 flex items-center py-20 pointer-events-none"
          >
            {/* Left Content Card Column (Desktop: Left 50%, Mobile: Lower 55%) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 pointer-events-auto pt-48 lg:pt-0">
              {/* Domain Numeral & Header */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-400 uppercase">
                  {event.num} // DOMAIN 0{idx + 1} OF 06
                </span>
              </div>

              {/* Dominant Event Title */}
              <div>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                  {event.name}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider uppercase pt-2">
                  {event.category}
                </p>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-white/20" />

              {/* Tagline / Description */}
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md">
                {event.tagline || event.description}
              </p>

              {/* Competitive Tracks Pills */}
              {event.featuredEvents && event.featuredEvents.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                    // COMPETITIVE TRACKS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {event.featuredEvents.map((item, trackIdx) => (
                      <span
                        key={trackIdx}
                        className="text-[10px] sm:text-[11px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Explore Event Action CTA */}
              <div className="pt-3">
                <MagneticButton dataCursor="EXPLORE">
                  <button
                    onClick={() => eventStore.setSelectedEvent(event)}
                    className="px-8 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                    aria-label={`Explore ${event.name} details`}
                  >
                    <span>EXPLORE {event.name}</span>
                    <span>→</span>
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. STICKY BOTTOM DOMAIN PILLS TRACKER */}
      <div className="sticky bottom-6 z-30 max-w-fit mx-auto px-4 py-2 bg-black/80 backdrop-blur-md border border-white/15 rounded-full shadow-2xl flex items-center gap-2 sm:gap-4 pointer-events-auto">
        {EDITORIAL_EVENTS.map((ev, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={ev.id}
              onClick={() => scrollToDomain(idx)}
              className={`text-[9px] sm:text-[11px] font-mono tracking-wider uppercase transition-all px-2.5 py-1 rounded-full cursor-pointer ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md scale-105"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {ev.num} {ev.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
