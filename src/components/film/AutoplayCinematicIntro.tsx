"use client";

import React, { useState, useEffect, useCallback } from "react";
import AutoplayCanvas from "./AutoplayCanvas";
import AutoplayTypography from "./AutoplayTypography";

interface AutoplayCinematicIntroProps {
  onComplete: () => void;
}

export default function AutoplayCinematicIntro({ onComplete }: AutoplayCinematicIntroProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  // 14–16 second cinematic intro playback loop
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        onComplete();
        return;
      }
    }

    let animId: number;
    const startTime = performance.now();
    const TOTAL_DURATION_SEC = 16.0;

    const step = (now: number) => {
      const sec = (now - startTime) / 1000;
      setElapsedTime(sec);

      if (sec < TOTAL_DURATION_SEC) {
        animId = requestAnimationFrame(step);
      } else {
        // Auto-complete intro after full sequence
        onComplete();
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#070709] overflow-hidden select-none z-50">
      {/* 3D WebGL Canvas with continuous rotating Earth, dynamic Lighting & Camera rig */}
      <AutoplayCanvas elapsedTime={elapsedTime} />

      {/* Top Minimal Skip Button (Subtle & unobtrusive) */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-30 pointer-events-auto">
        <button
          onClick={handleSkip}
          className="px-3.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-white/15 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-neutral-400 hover:text-black rounded-full transition-all cursor-pointer shadow-lg"
          aria-label="Skip to main website"
        >
          SKIP [→]
        </button>
      </div>

      {/* Editorial Single-Scene Typography with Enter Button */}
      <AutoplayTypography elapsedTime={elapsedTime} onEnter={onComplete} />
    </div>
  );
}
