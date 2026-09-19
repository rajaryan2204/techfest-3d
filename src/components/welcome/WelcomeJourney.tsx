"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WelcomeCanvas from "./WelcomeCanvas";
import WelcomeTypography from "./WelcomeTypography";
import WelcomeHUD from "./WelcomeHUD";
import { audioEngine } from "@/lib/audioEngine";

interface WelcomeJourneyProps {
  onEnterFest: () => void;
}

export default function WelcomeJourney({ onEnterFest }: WelcomeJourneyProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [journeyProgress, setJourneyProgress] = useState(0);

  const handleSkip = useCallback(() => {
    audioEngine.playBeep(800, 0.08);
    onEnterFest();
  }, [onEnterFest]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number;

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.15,
      onUpdate: (self) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setJourneyProgress(self.progress);
          if (self.progress >= 0.985) {
            onEnterFest();
          }
        });
      },
    });

    const handleScroll = () => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
        if (trackHeight > 0) {
          const scrollWithin = -rect.top;
          const raw = Math.max(0, Math.min(1, scrollWithin / trackHeight));
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            setJourneyProgress(raw);
            if (raw >= 0.985) {
              onEnterFest();
            }
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      trigger.kill();
    };
  }, [onEnterFest]);

  return (
    <div id="welcome-journey" ref={trackRef} className="relative w-full h-[420vh] bg-[#070709]">
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#070709]">
        {/* Single Primary 3D WebGL Canvas */}
        <WelcomeCanvas progress={journeyProgress} />

        {/* Minimal HUD (Chapter tracker, progress hairline, skip) */}
        <WelcomeHUD progress={journeyProgress} onSkip={handleSkip} />

        {/* Strictly Non-Overlapping Scientific Narrative Typography */}
        <WelcomeTypography progress={journeyProgress} onEnter={onEnterFest} />
      </div>
    </div>
  );
}
