"use client";

import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { FEST_DATA } from "@/data/festData";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(1);
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Smooth fast progress progression with guaranteed completion
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds max loading experience

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeFraction = Math.min(1, elapsed / duration);
      // Combine real asset progress with smooth time progression
      const realProgress = progress || 0;
      const calculated = Math.max(
        Math.round(timeFraction * 100),
        Math.round(realProgress)
      );

      setDisplayProgress((prev) => Math.max(prev, Math.min(100, calculated)));

      if (timeFraction >= 1) {
        clearInterval(interval);
        setDisplayProgress(100);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setMounted(false), 400);
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  if (!mounted) return null;

  const formattedNum = String(Math.min(100, Math.max(1, displayProgress))).padStart(2, "0");

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#070709] text-white select-none transition-opacity duration-400 pointer-events-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={!fading}
    >
      {/* Brand Header */}
      <div>
        <span className="text-xs font-mono tracking-[0.4em] text-neutral-400 uppercase">
          {FEST_DATA.shortTitle}
        </span>
      </div>

      {/* Center Counter */}
      <div className="space-y-4 max-w-sm">
        <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
          LOADING EXPERIENCE
        </span>
        <div className="text-4xl sm:text-6xl font-extralight font-mono text-white tracking-tight flex items-baseline gap-3">
          <span>{formattedNum}</span>
          <span className="text-neutral-600 text-2xl font-light">— 100%</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-600 tracking-[0.3em] uppercase">
        <span>SLIET LONGOWAL</span>
        <span>09—10 OCT 2026</span>
      </div>
    </div>
  );
}
