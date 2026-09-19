"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import EventDomainCanvas from "@/components/events/EventDomainCanvas";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function EventsVerticalSwipeSlides() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (!container || slides.length < 2) return;

    // Set initial stacking and positions:
    // Slide 0 is in viewport (yPercent: 0), all subsequent slides start BELOW viewport (yPercent: 100)
    slides.forEach((slide, idx) => {
      gsap.set(slide, {
        yPercent: idx === 0 ? 0 : 100,
        zIndex: idx + 1,
      });
    });

    const scrollHeight = (slides.length - 1) * window.innerHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const numTransitions = slides.length - 1;
          const currentIdx = Math.min(
            slides.length - 1,
            Math.floor(self.progress * numTransitions + 0.5)
          );
          setActiveSlide(currentIdx);
        },
      },
    });

    // Sequential vertical swipe animations
    for (let i = 0; i < slides.length - 1; i++) {
      const currentSlide = slides[i];
      const nextSlide = slides[i + 1];

      // When scrolling down / swiping up:
      // Current slide translates from 0 -> -100% (exits off the top)
      // Next slide translates from 100% -> 0% (enters from the bottom)
      tl.to(
        currentSlide,
        {
          yPercent: -100,
          ease: "none",
        },
        i
      ).to(
        nextSlide,
        {
          yPercent: 0,
          ease: "none",
        },
        i
      );
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  const scrollToDomainIdx = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const numTransitions = EDITORIAL_EVENTS.length - 1;
    const scrollHeight = numTransitions * window.innerHeight;
    const targetY = container.offsetTop + (scrollHeight / numTransitions) * idx;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full z-30 bg-[#070709] overflow-hidden">
      <section
        id="events-track"
        ref={containerRef}
        className="relative w-full h-screen h-[100svh] bg-[#070709] overflow-hidden select-none"
      >
        {/* Pinned Fullscreen Viewport Container */}
        <div ref={viewportRef} className="relative w-full h-full overflow-hidden bg-[#070709]">
          {EDITORIAL_EVENTS.map((event, idx) => (
            <div
              key={event.id}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-12 md:px-20 text-white bg-[#070709] overflow-hidden"
            >
              {/* Top Scene Tracker Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 pointer-events-auto shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-300 uppercase">
                    COMPETITIVE EXHIBITION // DOMAIN {event.num} OF 06
                  </span>
                </div>

                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
                  SWIPE UP / SCROLL TO ADVANCE ↓
                </span>
              </div>

              {/* Main Full-Screen Split: Left Column Editorial + Right Column 3D Canvas */}
              <div className="relative w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center pointer-events-none min-h-0">
                {/* Left Column: Domain Editorial Info */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-4 pointer-events-auto order-2 lg:order-1 pb-2 lg:pb-0">
                  {/* Domain Numeral */}
                  <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-400 uppercase block">
                    {event.num} // DOMAIN
                  </span>

                  {/* Dominant Event Title */}
                  <div>
                    <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                      {event.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider uppercase pt-1">
                      {event.category}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-px bg-white/20" />

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                    {event.tagline || event.description}
                  </p>

                  {/* Featured Competitive Tracks */}
                  {event.featuredEvents && event.featuredEvents.length > 0 && (
                    <div className="space-y-1 sm:space-y-1.5 pt-1">
                      <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                        // COMPETITIVE TRACKS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {event.featuredEvents.map((item, trackIdx) => (
                          <span
                            key={trackIdx}
                            className="text-[10px] sm:text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-0.5"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explore Event Action CTA */}
                  <div className="pt-2">
                    <MagneticButton dataCursor="EXPLORE">
                      <button
                        onClick={() => eventStore.setSelectedEvent(event)}
                        className="px-7 py-3 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                        aria-label={`Explore ${event.name} details`}
                      >
                        <span>EXPLORE {event.name}</span>
                        <span>→</span>
                      </button>
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Column: Dedicated 3D Canvas */}
                <div className="lg:col-span-6 w-full h-[220px] sm:h-[340px] lg:h-[480px] flex items-center justify-center pointer-events-none order-1 lg:order-2">
                  <EventDomainCanvas domainIndex={idx} />
                </div>
              </div>

              {/* Bottom Domain Navigation Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 pointer-events-auto shrink-0">
                <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
                  {EDITORIAL_EVENTS.map((ev, bIdx) => {
                    const isActive = activeSlide === bIdx;
                    return (
                      <button
                        key={ev.id}
                        onClick={() => scrollToDomainIdx(bIdx)}
                        className={`text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all cursor-pointer py-1 px-1.5 whitespace-nowrap shrink-0 ${
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
                  SCROLL TO SWIPE ↓
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
