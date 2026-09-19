"use client";

import React from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function EventsExhibition() {
  return (
    <section id="events-section" className="py-24 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase">
            // COMPETITIVE TRACKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white uppercase font-sans">
            EVENT DOMAINS
          </h2>
        </div>
        <p className="text-xs font-mono text-neutral-400 tracking-wider max-w-xs uppercase">
          6 FLAGSHIP DOMAINS // 40+ NATIONAL COMPETITIONS // CASH PRIZES & CERTIFICATES
        </p>
      </div>

      {/* 6 Editorial Event Exhibits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDITORIAL_EVENTS.map((event) => (
          <div
            key={event.id}
            onClick={() => eventStore.setSelectedEvent(event)}
            className="group relative bg-[#0a0a0e] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 p-6 sm:p-8 transition-all duration-300 rounded-xs flex flex-col justify-between space-y-6 cursor-pointer"
          >
            {/* Top Tag & Domain Numeral */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors">
                {event.num} // DOMAIN
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 bg-white/5 px-2 py-0.5 uppercase">
                {event.filterTag}
              </span>
            </div>

            {/* Event Name & Category */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-cyan-300 transition-colors font-sans">
                {event.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {event.category}
              </p>
              <p className="text-xs text-neutral-400 font-light line-clamp-3 leading-relaxed pt-2">
                {event.description}
              </p>
            </div>

            {/* Featured Competitions Mini List */}
            {event.featuredEvents && event.featuredEvents.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                  HIGHLIGHTS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {event.featuredEvents.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded-xs"
                    >
                      {item}
                    </span>
                  ))}
                  {event.featuredEvents.length > 3 && (
                    <span className="text-[10px] font-mono text-neutral-500 py-0.5">
                      +{event.featuredEvents.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CTA Trigger */}
            <div className="pt-2">
              <MagneticButton dataCursor="VIEW">
                <span className="text-xs font-mono tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors uppercase inline-flex items-center gap-2">
                  <span>EXPLORE TRACK</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform">
                    →
                  </span>
                </span>
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
