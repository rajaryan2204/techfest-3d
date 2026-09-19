"use client";

import React, { useState } from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import Event3DScene from "./Event3DScene";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function EventsExhibition() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentEvent = EDITORIAL_EVENTS[activeIndex] || EDITORIAL_EVENTS[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EDITORIAL_EVENTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + EDITORIAL_EVENTS.length) % EDITORIAL_EVENTS.length);
  };

  return (
    <section id="events-exhibition" className="relative min-h-screen w-full bg-[#070709] flex items-center justify-center overflow-hidden py-16 px-6 sm:px-12 md:px-16 select-none border-b border-white/10">
      {/* 3D Exhibit Background Layer */}
      <Event3DScene activeIndex={activeIndex} />

      {/* Main Exhibition Layout Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col justify-between min-h-[75vh]">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-400 uppercase">
              COMPETITIVE EXHIBITION // DOMAIN {currentEvent.num}
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            {activeIndex + 1} OF {EDITORIAL_EVENTS.length}
          </span>
        </div>

        {/* Center: Large Editorial Exhibition Content Block (Dominates Viewport) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto py-8">
          {/* Left Column: Typography */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6 text-white">
            {/* Huge Domain Numeral */}
            <span className="text-4xl sm:text-7xl md:text-8xl font-extralight text-white/20 tracking-tighter leading-none block font-mono">
              {currentEvent.num}
            </span>

            {/* Event Name */}
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                {currentEvent.name}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-[0.25em] uppercase pt-1">
                {currentEvent.category}
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-white/20" />

            {/* Tagline / Description */}
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-md">
              {currentEvent.tagline || currentEvent.description}
            </p>

            {/* Featured Competitions Pills */}
            {currentEvent.featuredEvents && currentEvent.featuredEvents.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                  // FEATURED TRACKS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentEvent.featuredEvents.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Event CTA Button */}
            <div className="pt-4">
              <MagneticButton dataCursor="EXPLORE">
                <button
                  onClick={() => eventStore.setSelectedEvent(currentEvent)}
                  className="px-8 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                  aria-label={`Explore ${currentEvent.name} details`}
                >
                  <span>EXPLORE {currentEvent.name}</span>
                  <span>→</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Spacing for 3D Exhibit (3D canvas occupies the background) */}
          <div className="hidden md:block md:col-span-6 pointer-events-none min-h-[350px]" />
        </div>

        {/* Bottom Navigator Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
          {/* Vertical/Horizontal Navigator Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {EDITORIAL_EVENTS.map((ev, idx) => (
              <button
                key={ev.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all cursor-pointer py-1 ${
                  activeIndex === idx
                    ? "text-cyan-300 font-semibold border-b border-cyan-400"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {ev.num} {ev.name}
              </button>
            ))}
          </div>

          {/* Prev / Next Quick Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous domain"
            >
              ← PREV
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-white/10 bg-white/5 hover:bg-white/15 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next domain"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
