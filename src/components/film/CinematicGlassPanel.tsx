"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";

interface CinematicGlassPanelProps {
  elapsedTime: number; // 0.0s to 14.5s
}

export default function CinematicGlassPanel({ elapsedTime }: CinematicGlassPanelProps) {
  // 9-Frame Master Narrative Timeline (0.0s - 14.5s)
  // Scene 01: 0.2s - 1.8s (THIS IS OUR HOME.)
  // Scene 02: 1.9s - 3.4s (BUT WHAT COMES NEXT?)
  // Scene 03: 3.5s - 5.0s (EVERY FUTURE STARTS WITH AN IDEA.)
  // Scene 04: 5.1s - 6.8s (SCIENCE GIVES IT DIRECTION.)
  // Scene 05: 6.9s - 8.6s (TECHNOLOGY GIVES IT LIFE.)
  // Scene 06: 8.7s - 10.4s (FOR A SUSTAINABLE EARTH. - Single Subtle Glass Panel)
  // Scene 07: 10.5s - 11.8s (Geographic Light Path to SLIET)
  // Scene 08: 11.9s - 13.0s (SLIET // 09-10 OCTOBER 2026)
  // Scene 09: 13.1s - 14.5s (TECHFEST'26 FINAL REVEAL)

  let activeFrame = 0;
  let localT = 0;

  if (elapsedTime >= 0.2 && elapsedTime < 1.8) {
    activeFrame = 1;
    localT = (elapsedTime - 0.2) / 1.6;
  } else if (elapsedTime >= 1.9 && elapsedTime < 3.4) {
    activeFrame = 2;
    localT = (elapsedTime - 1.9) / 1.5;
  } else if (elapsedTime >= 3.5 && elapsedTime < 5.0) {
    activeFrame = 3;
    localT = (elapsedTime - 3.5) / 1.5;
  } else if (elapsedTime >= 5.1 && elapsedTime < 6.8) {
    activeFrame = 4;
    localT = (elapsedTime - 5.1) / 1.7;
  } else if (elapsedTime >= 6.9 && elapsedTime < 8.6) {
    activeFrame = 5;
    localT = (elapsedTime - 6.9) / 1.7;
  } else if (elapsedTime >= 8.7 && elapsedTime < 10.4) {
    activeFrame = 6;
    localT = (elapsedTime - 8.7) / 1.7;
  } else if (elapsedTime >= 10.5 && elapsedTime < 11.8) {
    activeFrame = 7;
    localT = (elapsedTime - 10.5) / 1.3;
  } else if (elapsedTime >= 11.9 && elapsedTime < 13.0) {
    activeFrame = 8;
    localT = (elapsedTime - 11.9) / 1.1;
  } else if (elapsedTime >= 13.1) {
    activeFrame = 9;
    localT = Math.min(1.0, (elapsedTime - 13.1) / 1.4);
  }

  // Smooth bell-curve opacity
  let opacity = 0;
  let translateY = 0;

  if (activeFrame > 0 && activeFrame < 9) {
    if (localT < 0.22) {
      opacity = localT / 0.22;
      translateY = (1.0 - opacity) * 12;
    } else if (localT > 0.78) {
      opacity = (1.0 - localT) / 0.22;
      translateY = -(1.0 - opacity) * 8;
    } else {
      opacity = 1.0;
      translateY = 0;
    }
  } else if (activeFrame === 9) {
    opacity = Math.min(1.0, localT / 0.35);
    translateY = (1.0 - opacity) * 16;
  }

  if (activeFrame === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex items-center justify-center px-6 sm:px-12 text-center text-white">
      {/* Floating Editorial Typography Container */}
      <div
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0) scale(${0.985 + opacity * 0.015})`,
          transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        }}
        className={`w-full max-w-lg sm:max-w-xl ${
          activeFrame === 6
            ? "px-8 sm:px-14 py-8 sm:py-12 bg-[#0a0f14]/30 backdrop-blur-md border border-white/15 rounded-sm shadow-2xl space-y-2"
            : "px-6 py-8 space-y-3"
        }`}
      >
        {/* SCENE 01 — EARTH */}
        {activeFrame === 1 && (
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-tight">
            THIS IS OUR HOME.
          </h2>
        )}

        {/* SCENE 02 — THE QUESTION */}
        {activeFrame === 2 && (
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-tight">
            BUT WHAT <br />
            <span className="text-neutral-300 font-light">COMES NEXT?</span>
          </h2>
        )}

        {/* SCENE 03 — IDEA */}
        {activeFrame === 3 && (
          <div className="space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
              // THE SPARK
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-tight">
              EVERY FUTURE <br />
              <span className="text-cyan-200 font-light">STARTS WITH AN IDEA.</span>
            </h2>
          </div>
        )}

        {/* SCENE 04 — SCIENCE */}
        {activeFrame === 4 && (
          <div className="space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
              // DIRECTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-tight">
              SCIENCE <br />
              <span className="text-cyan-200 font-light">GIVES IT DIRECTION.</span>
            </h2>
          </div>
        )}

        {/* SCENE 05 — TECHNOLOGY */}
        {activeFrame === 5 && (
          <div className="space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
              // CREATION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-tight">
              TECHNOLOGY <br />
              <span className="text-cyan-200 font-light">GIVES IT LIFE.</span>
            </h2>
          </div>
        )}

        {/* SCENE 06 — SUSTAINABILITY (The Single Subtle Glass Panel) */}
        {activeFrame === 6 && (
          <div className="space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-emerald-400 uppercase block">
              // BALANCE
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-tight">
              FOR A <br />
              <span className="text-emerald-300 font-light">SUSTAINABLE EARTH.</span>
            </h2>
          </div>
        )}

        {/* SCENE 07 — EARTH -> SLIET */}
        {activeFrame === 7 && (
          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase block">
              // TRANSITION
            </span>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 tracking-[0.4em] uppercase pt-1">
              EARTH → INDIA → PUNJAB → SLIET
            </p>
          </div>
        )}

        {/* SCENE 08 — SLIET */}
        {activeFrame === 8 && (
          <div className="space-y-2">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase block">
              // DESTINATION
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.3em] text-white uppercase font-sans leading-none">
              SLIET
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-[0.4em] uppercase pt-1">
              09—10 OCTOBER 2026
            </p>
          </div>
        )}

        {/* SCENE 09 — FINAL REVEAL (Grand Film Title Reveal) */}
        {activeFrame === 9 && (
          <div className="space-y-4 sm:space-y-5">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.45em] text-cyan-400 uppercase block">
              NATIONAL TECHNICAL FESTIVAL
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
              {FEST_DATA.shortTitle}
            </h1>
            <p className="text-xs sm:text-sm font-light text-neutral-200 tracking-[0.25em] font-sans uppercase max-w-md mx-auto pt-1">
              Technology and Sciences for Sustainable Earth
            </p>
            <p className="text-[9px] sm:text-[11px] font-mono text-neutral-500 tracking-[0.35em] uppercase pt-2">
              09—10 OCTOBER 2026 // SLIET
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
