"use client";

import React from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

interface EventsCinematicOverlayProps {
  progress: number;
}

const RANGES = [
  { start: 0.00, end: 0.18, center: 0.08 },
  { start: 0.16, end: 0.36, center: 0.26 },
  { start: 0.34, end: 0.54, center: 0.44 },
  { start: 0.52, end: 0.72, center: 0.62 },
  { start: 0.70, end: 0.90, center: 0.80 },
  { start: 0.86, end: 1.00, center: 0.94 },
];

function getCardTransform(progress: number, idx: number) {
  const r = RANGES[idx];
  const fadeDist = 0.05;

  if (progress < r.start || progress > r.end) {
    return { opacity: 0, translateY: 35, visible: false };
  }

  let opacity = 1;
  let translateY = 0;

  if (idx === 0) {
    if (progress > r.end - fadeDist) {
      const exitT = (progress - (r.end - fadeDist)) / fadeDist;
      opacity = Math.max(0, 1 - exitT);
      translateY = -30 * exitT;
    }
  } else if (idx === 5) {
    if (progress < r.start + fadeDist) {
      const enterT = (progress - r.start) / fadeDist;
      opacity = Math.max(0, enterT);
      translateY = 30 * (1 - enterT);
    }
  } else {
    if (progress < r.center) {
      const enterT = Math.max(0, Math.min(1, (progress - r.start) / fadeDist));
      opacity = enterT;
      translateY = 30 * (1 - enterT);
    } else {
      const exitT = Math.max(0, Math.min(1, (progress - (r.end - fadeDist)) / fadeDist));
      opacity = 1 - exitT;
      translateY = -30 * exitT;
    }
  }

  return {
    opacity: Math.max(0, Math.min(1, opacity)),
    translateY,
    visible: opacity > 0.01,
  };
}

export default function EventsCinematicOverlay({ progress }: EventsCinematicOverlayProps) {
  // Find current active domain index
  const activeIdx = RANGES.findIndex((r) => progress >= r.start && progress <= r.end);
  const safeIdx = activeIdx >= 0 ? activeIdx : (progress > 0.8 ? 5 : 0);
  const currentDomain = EDITORIAL_EVENTS[safeIdx];

  const scrollToRangeCenter = (idx: number) => {
    const track = document.getElementById("events-cinematic-track");
    if (track) {
      const targetP = RANGES[idx].center;
      const scrollDist = track.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: track.offsetTop + scrollDist * targetP,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between pt-20 sm:pt-28 pb-4 sm:pb-8 px-4 sm:px-12 md:px-20 text-white">
      {/* Top Header Tag */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.35em] text-neutral-300 uppercase">
            COMPETITIVE EXHIBITION // DOMAIN {currentDomain.num} OF 06
          </span>
        </div>

        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
          SCROLL TO MORPH DOMAINS ↓
        </span>
      </div>

      {/* Center Stage: Cards morph and dissolve with translateY animation */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-end sm:items-center pb-8 sm:pb-0 pointer-events-none">
        {EDITORIAL_EVENTS.map((event, idx) => {
          const { opacity, translateY, visible } = getCardTransform(progress, idx);
          if (!visible) return null;

          return (
            <div
              key={event.id}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
              }}
              className="absolute left-0 max-w-xs sm:max-w-md space-y-2.5 sm:space-y-4 pointer-events-auto"
            >
              {/* Event Numeral */}
              <span className="text-[11px] sm:text-sm font-mono tracking-[0.3em] text-cyan-400 uppercase block">
                {event.num} // DOMAIN
              </span>

              {/* Dominant Event Title */}
              <div>
                <h2 className="text-3xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                  {event.name}
                </h2>
                <p className="text-[11px] sm:text-sm font-mono text-neutral-400 tracking-wider uppercase pt-1">
                  {event.category}
                </p>
              </div>

              {/* Divider */}
              <div className="w-10 sm:w-12 h-px bg-white/20" />

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xs sm:max-w-sm line-clamp-3 sm:line-clamp-none">
                {event.tagline || event.description}
              </p>

              {/* Featured Tracks Pills */}
              {event.featuredEvents && event.featuredEvents.length > 0 && (
                <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1">
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                    // COMPETITIVE TRACKS:
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {event.featuredEvents.slice(0, 3).map((item, trackIdx) => (
                      <span
                        key={trackIdx}
                        className="text-[9px] sm:text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-1.5 sm:px-2 py-0.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Explore Event CTA */}
              <div className="pt-1.5 sm:pt-2">
                <MagneticButton dataCursor="EXPLORE">
                  <button
                    onClick={() => eventStore.setSelectedEvent(event)}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-black font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                    aria-label={`Explore ${event.name} details`}
                  >
                    <span>EXPLORE {event.name}</span>
                    <span>→</span>
                  </button>
                </MagneticButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Domain Navigation Bar with Horizontal Swipe on Mobile */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          {EDITORIAL_EVENTS.map((ev, idx) => {
            const isActive = safeIdx === idx;
            return (
              <button
                key={ev.id}
                onClick={() => scrollToRangeCenter(idx)}
                className={`text-[9px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all cursor-pointer py-1 px-1 whitespace-nowrap shrink-0 ${
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

        <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase hidden md:block shrink-0">
          SCROLL OR CLICK TO JUMP ↓
        </span>
      </div>
    </div>
  );
}
