"use client";

import React, { useState, useEffect, useRef } from "react";
import EventsCanvas from "./EventsCanvas";
import EventsOverlay from "./EventsOverlay";

export default function EventsExhibitionTrack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  // Wheel listener to advance domains or continue scrolling
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;

      if (inView) {
        if (e.deltaY > 40) {
          // Scrolling down
          if (activeIdx < 5) {
            e.preventDefault();
            if (!isTransitioning.current) {
              isTransitioning.current = true;
              setActiveIdx((prev) => Math.min(5, prev + 1));
              setTimeout(() => {
                isTransitioning.current = false;
              }, 400);
            }
          }
          // If activeIdx === 5, let default scroll happen so user naturally enters Beyond The Events!
        } else if (e.deltaY < -40) {
          // Scrolling up
          if (activeIdx > 0 && rect.top >= -50) {
            e.preventDefault();
            if (!isTransitioning.current) {
              isTransitioning.current = true;
              setActiveIdx((prev) => Math.max(0, prev - 1));
              setTimeout(() => {
                isTransitioning.current = false;
              }, 400);
            }
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;

      if (inView && Math.abs(diffY) > 50) {
        if (diffY > 0 && activeIdx < 5) {
          setActiveIdx((prev) => Math.min(5, prev + 1));
        } else if (diffY < 0 && activeIdx > 0 && rect.top >= -50) {
          setActiveIdx((prev) => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIdx]);

  return (
    <section
      id="events-track"
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] bg-[#070709] overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas with High-Luminosity Domain Object */}
      <EventsCanvas activeIdx={activeIdx} />

      {/* Editorial Domain Overlay with Text & Navigation */}
      <EventsOverlay activeIdx={activeIdx} onSelectIdx={setActiveIdx} />
    </section>
  );
}
