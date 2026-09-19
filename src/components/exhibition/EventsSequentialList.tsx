"use client";

import React, { useState, useEffect } from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import EventDomainCanvas from "@/components/events/EventDomainCanvas";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function EventsSequentialList() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      EDITORIAL_EVENTS.forEach((_, idx) => {
        const el = document.getElementById(`domain-section-${idx}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveIdx(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDomain = (idx: number) => {
    const el = document.getElementById(`domain-section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="events-track" className="relative w-full bg-[#070709] text-white">
      {/* Top Header Tag for Exhibition */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-10 pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-300 uppercase">
            COMPETITIVE EXHIBITION // 06 FLAGSHIP DOMAINS
          </span>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
          SCROLL DOWN STEP-BY-STEP ↓
        </span>
      </div>

      {/* 6 Sequential Full-Height Domain Cards */}
      <div className="divide-y divide-white/5">
        {EDITORIAL_EVENTS.map((event, idx) => (
          <div
            key={event.id}
            id={`domain-section-${idx}`}
            className="relative w-full min-h-screen flex flex-col justify-center py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Domain Editorial Info (5 cols) */}
              <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
                {/* Domain Numeral */}
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-400 uppercase">
                    {event.num} // DOMAIN
                  </span>
                  <div className="w-12 h-px bg-white/20" />
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

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg pt-1">
                  {event.tagline || event.description}
                </p>

                {/* Featured Competitive Tracks */}
                {event.featuredEvents && event.featuredEvents.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                      // COMPETITIVE TRACKS:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.featuredEvents.map((item, trackIdx) => (
                        <span
                          key={trackIdx}
                          className="text-xs font-mono text-neutral-200 bg-white/5 border border-white/15 px-3 py-1 rounded-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explore Event Action CTA */}
                <div className="pt-4 flex items-center gap-4">
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

              {/* Right Column: Dedicated 3D WebGL Model (6 cols) */}
              <div className="lg:col-span-6 w-full h-[360px] sm:h-[480px] lg:h-[540px] order-1 lg:order-2 flex items-center justify-center relative">
                <EventDomainCanvas domainIndex={idx} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Domain Pill Navigator */}
      <div className="sticky bottom-6 z-30 max-w-fit mx-auto px-4 py-2 bg-black/70 backdrop-blur-md border border-white/15 rounded-full shadow-2xl flex items-center gap-2 sm:gap-4 pointer-events-auto">
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
