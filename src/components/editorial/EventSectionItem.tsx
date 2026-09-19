"use client";

import React from "react";
import { DetailedEvent } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

interface EventSectionItemProps {
  event: DetailedEvent;
  isActive: boolean;
  opacity: number;
}

export default function EventSectionItem({
  event,
  isActive,
  opacity,
}: EventSectionItemProps) {
  if (opacity <= 0.01) return null;

  // Staggered smooth subtle offset
  const translateOffset = (1 - opacity) * 15;

  return (
    <section
      className="fixed inset-0 pointer-events-none z-20 flex items-end sm:items-center pb-20 sm:pb-0 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full transition-opacity duration-300 select-none"
      style={{
        opacity,
      }}
      aria-hidden={!isActive}
    >
      {/* Editorial Content Block */}
      <div className="max-w-xs sm:max-w-md w-full text-white pointer-events-auto space-y-3 sm:space-y-4">
        {/* Index Numeral */}
        <div>
          <span
            className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-neutral-400 block transition-transform duration-300 ease-out uppercase"
            style={{
              transform: `translate3d(0, ${translateOffset * 0.4}px, 0)`,
            }}
          >
            {event.num} // DOMAIN
          </span>
        </div>

        {/* Event Name Heading */}
        <div>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-none font-sans transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(0, ${translateOffset * 0.7}px, 0)`,
            }}
          >
            {event.name}
          </h2>
        </div>

        {/* Category Subtitle */}
        <div>
          <p
            className="text-[11px] sm:text-xs font-mono tracking-wider text-cyan-400 uppercase transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(0, ${translateOffset * 0.9}px, 0)`,
            }}
          >
            {event.category}
          </p>
        </div>

        {/* Divider line */}
        <div
          className="w-10 h-px bg-white/20 transition-all duration-300"
          style={{ width: `${Math.min(40, opacity * 40)}px` }}
        />

        {/* Short Description */}
        <p
          className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-sm transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(0, ${translateOffset}px, 0)`,
          }}
        >
          {event.tagline || event.description}
        </p>

        {/* Magnetic Explore Event Button */}
        <div className="pt-1">
          <MagneticButton dataCursor="VIEW">
            <button
              onClick={() => eventStore.setSelectedEvent(event)}
              className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-white hover:text-cyan-300 transition-colors uppercase inline-flex items-center gap-2 cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 py-1"
              aria-label={`Explore ${event.name} details`}
            >
              <span>EXPLORE EVENT</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
