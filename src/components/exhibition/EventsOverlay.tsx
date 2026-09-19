"use client";

import React from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

interface EventsOverlayProps {
  activeIdx: number;
  onSelectIdx: (idx: number) => void;
}

export default function EventsOverlay({ activeIdx, onSelectIdx }: EventsOverlayProps) {
  const currentEvent = EDITORIAL_EVENTS[activeIdx] || EDITORIAL_EVENTS[0];

  const handleNext = () => {
    onSelectIdx(Math.min(5, activeIdx + 1));
  };

  const handlePrev = () => {
    onSelectIdx(Math.max(0, activeIdx - 1));
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-12 md:px-20 text-white">
      {/* Top Header Tag */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-300 uppercase">
            COMPETITIVE EXHIBITION // DOMAIN {currentEvent.num} OF 06
          </span>
        </div>

        {/* Quick Domain Switcher Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={activeIdx === 0}
            className="px-3 py-1.5 text-[10px] font-mono border border-white/20 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black rounded-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-lg"
            aria-label="Previous domain"
          >
            ← PREV
          </button>
          <button
            onClick={handleNext}
            disabled={activeIdx === 5}
            className="px-3 py-1.5 text-[10px] font-mono border border-white/20 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black rounded-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-lg"
            aria-label="Next domain"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Center: Strictly ONE active event rendered at a time (Crystal Clear Left 45% Text Column) */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-end sm:items-center pb-12 sm:pb-0 pointer-events-none">
        <div
          key={currentEvent.id}
          className="flex flex-col justify-end sm:justify-center max-w-sm sm:max-w-md space-y-3 sm:space-y-4 pointer-events-auto animate-in fade-in duration-300"
        >
          {/* Event Numeral */}
          <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase block">
            {currentEvent.num} // DOMAIN
          </span>

          {/* Dominant Event Title */}
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
              {currentEvent.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wider uppercase pt-1">
              {currentEvent.category}
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/20" />

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-sm">
            {currentEvent.tagline || currentEvent.description}
          </p>

          {/* Featured Tracks Pills */}
          {currentEvent.featuredEvents && currentEvent.featuredEvents.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                // COMPETITIVE TRACKS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentEvent.featuredEvents.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2 py-0.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Explore Event CTA */}
          <div className="pt-2">
            <MagneticButton dataCursor="EXPLORE">
              <button
                onClick={() => eventStore.setSelectedEvent(currentEvent)}
                className="px-7 py-3 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                aria-label={`Explore ${currentEvent.name} details`}
              >
                <span>EXPLORE {currentEvent.name}</span>
                <span>→</span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom Domain Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-4 pointer-events-auto">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          {EDITORIAL_EVENTS.map((ev, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={ev.id}
                onClick={() => onSelectIdx(idx)}
                className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all cursor-pointer py-1 ${
                  isActive
                    ? "text-cyan-300 font-semibold border-b-2 border-cyan-400 scale-105"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {ev.num} {ev.name}
              </button>
            );
          })}
        </div>

        <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase hidden sm:block">
          USE ARROWS OR CLICK PILLS TO EXPLORE DOMAINS ↓
        </span>
      </div>
    </div>
  );
}
