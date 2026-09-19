"use client";

import React from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import EventDomainCanvas from "@/components/events/EventDomainCanvas";
import MagneticButton from "@/components/interaction/MagneticButton";

const DOMAIN_THEMES = [
  { glow: "from-cyan-500/20 to-transparent", border: "border-cyan-500/30", tag: "text-cyan-400" },
  { glow: "from-blue-500/20 to-transparent", border: "border-blue-500/30", tag: "text-blue-400" },
  { glow: "from-emerald-500/20 to-transparent", border: "border-emerald-500/30", tag: "text-emerald-400" },
  { glow: "from-purple-500/20 to-transparent", border: "border-purple-500/30", tag: "text-purple-400" },
  { glow: "from-sky-500/20 to-transparent", border: "border-sky-500/30", tag: "text-sky-400" },
  { glow: "from-amber-500/20 to-transparent", border: "border-amber-500/30", tag: "text-amber-400" },
];

export default function EventsStackingCards() {
  return (
    <section id="events-track" className="relative w-full bg-[#070709] py-16 px-4 sm:px-8 md:px-12 text-white">
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-300 uppercase">
              FLAGSHIP EXHIBITION // 06 COMPETITIVE DOMAINS
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extralight uppercase font-sans tracking-tight text-white">
            COMPETITIONS & CHALLENGES
          </h2>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          SCROLL TO STACK CARDS ↓
        </span>
      </div>

      {/* Stacking Cards Container */}
      <div className="max-w-6xl mx-auto pt-10 pb-20 space-y-16 sm:space-y-24">
        {EDITORIAL_EVENTS.map((event, idx) => {
          const theme = DOMAIN_THEMES[idx] || DOMAIN_THEMES[0];
          // Stagger top offset slightly so previous card top edge peeks through
          const topOffset = 80 + idx * 12;

          return (
            <div
              key={event.id}
              style={{
                top: `${topOffset}px`,
                zIndex: 10 + idx * 5,
              }}
              className="sticky rounded-3xl bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300"
            >
              {/* Subtle Ambient Radial Glow */}
              <div
                className={`absolute top-0 right-0 w-[350px] h-[350px] bg-radial ${theme.glow} blur-3xl pointer-events-none opacity-60`}
              />

              <div className="relative z-10 p-6 sm:p-10 lg:p-12">
                {/* Top Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] sm:text-xs font-mono tracking-[0.3em] font-semibold uppercase ${theme.tag}`}>
                      {event.num} // DOMAIN
                    </span>
                    <span className="text-neutral-600">//</span>
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
                      {event.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                    0{idx + 1} / 06
                  </span>
                </div>

                {/* Main Card Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Editorial Info (6 cols) */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                      {event.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider uppercase">
                      {event.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-md">
                      {event.description}
                    </p>

                    {/* Featured Tracks Pills */}
                    {event.featuredEvents && event.featuredEvents.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                          // FEATURED COMPETITIONS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {event.featuredEvents.map((track, trackIdx) => (
                            <span
                              key={trackIdx}
                              className="text-[11px] font-mono text-neutral-200 bg-white/5 border border-white/15 px-3 py-1 rounded-xs"
                            >
                              {track}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explore CTA Button */}
                    <div className="pt-4">
                      <MagneticButton dataCursor="EXPLORE">
                        <button
                          onClick={() => eventStore.setSelectedEvent(event)}
                          className="px-7 py-3 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl flex items-center gap-2"
                          aria-label={`Explore ${event.name} details`}
                        >
                          <span>EXPLORE {event.name}</span>
                          <span>→</span>
                        </button>
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right Column: Dedicated 3D Model Stage (6 cols) */}
                  <div className="lg:col-span-6 w-full h-[280px] sm:h-[360px] lg:h-[400px] flex items-center justify-center relative">
                    <EventDomainCanvas domainIndex={idx} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
