"use client";

import React, { useRef, useState, useEffect } from "react";
import EventsCinematicCanvas from "./EventsCinematicCanvas";
import EventsCinematicOverlay from "./EventsCinematicOverlay";

export default function EventsCinematicStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const scrollDist = trackRef.current.offsetHeight - window.innerHeight;
        if (scrollDist > 0) {
          const scrollWithin = -rect.top;
          const raw = Math.max(0, Math.min(1, scrollWithin / scrollDist));
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            setProgress(raw);
          });
        }
      }
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

  return (
    <section
      id="events-cinematic-track"
      ref={trackRef}
      className="relative w-full h-[350vh] bg-[#070709]"
    >
      {/* Sticky Fullscreen 3D Morph Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 3D WebGL Canvas with animated entrance / exit morphs */}
        <EventsCinematicCanvas progress={progress} />

        {/* Cinematic Card with animated slide-up exit and enter transitions */}
        <EventsCinematicOverlay progress={progress} />
      </div>
    </section>
  );
}
