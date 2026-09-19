"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CinematicCamera from "./CinematicCamera";
import CinematicLighting from "./CinematicLighting";
import RealEarth from "./RealEarth";
import CinematicWorldGeometry from "./CinematicWorldGeometry";
import CinematicGlassPanel from "./CinematicGlassPanel";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dpr, setDpr] = useState<number[]>([1, 1.5]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      setDpr(width < 768 ? [1, 1.25] : [1, 1.6]);
    }
  }, []);

  // 14.5-Second Master Storyboard Timeline
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
    const TOTAL_DURATION_SEC = 14.5;
    const FADE_OUT_START_SEC = 14.0;

    const step = (now: number) => {
      const sec = (now - startTime) / 1000;
      setElapsedTime(sec);

      if (sec >= FADE_OUT_START_SEC && !isFadingOut) {
        setIsFadingOut(true);
      }

      if (sec < TOTAL_DURATION_SEC) {
        animId = requestAnimationFrame(step);
      } else {
        // Auto-complete and transition into main website
        onComplete();
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete, isFadingOut]);

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-[#070709] overflow-hidden select-none z-50 transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D WebGL Canvas: Real Razor-Sharp Earth, Camera Rig & World Geometry */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 bg-[#070709]">
        <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#070709]" />}>
          <Canvas
            dpr={dpr as [number, number]}
            camera={{ position: [0, 0, 7.2], fov: 38 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <CinematicCamera elapsedTime={elapsedTime} />
            <CinematicLighting elapsedTime={elapsedTime} />

            <Suspense fallback={null}>
              <RealEarth elapsedTime={elapsedTime} />
              <CinematicWorldGeometry elapsedTime={elapsedTime} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* 9-Frame Floating Editorial Typography Overlay */}
      <CinematicGlassPanel elapsedTime={elapsedTime} />
    </div>
  );
}
