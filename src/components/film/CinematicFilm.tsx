"use client";

import React, { useState, useEffect, useCallback } from "react";
import CinematicFilmScene from "./CinematicFilmScene";
import CinematicTypography from "./CinematicTypography";
import StoryHUD from "./StoryHUD";
import { audioEngine } from "@/lib/audioEngine";

interface CinematicFilmProps {
  onEnterFest: () => void;
}

export default function CinematicFilm({ onEnterFest }: CinematicFilmProps) {
  const [filmProgress, setFilmProgress] = useState(0);

  // Automatic smooth playback loop (16 seconds total for full cinematic film)
  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const DURATION_MS = 16000;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1.0, elapsed / DURATION_MS);
      setFilmProgress(p);

      if (p < 1.0) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSkip = useCallback(() => {
    audioEngine.playBeep(800, 0.08);
    onEnterFest();
  }, [onEnterFest]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#070709] overflow-hidden select-none z-50">
      {/* Fullscreen 3D WebGL Canvas */}
      <CinematicFilmScene progress={filmProgress} />

      {/* Minimal Top Story HUD (Mode tag, Sound toggle, Skip button) */}
      <StoryHUD progress={filmProgress} onSkip={handleSkip} />

      {/* Centered Single-Element Story Typography with ENTER CTA */}
      <CinematicTypography
        progress={filmProgress}
        onEnter={onEnterFest}
      />
    </div>
  );
}
