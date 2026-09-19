"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

interface AutoplayTypographyProps {
  elapsedTime: number; // in seconds
  onEnter: () => void;
}

export default function AutoplayTypography({ elapsedTime, onEnter }: AutoplayTypographyProps) {
  // Discrete narrative scenes:
  // Scene 1: 0.0s - 2.0s (Darkness / Earth emerges - No text)
  // Scene 2: 2.0s - 4.0s (OUR HOME. -> ONE PLANET.)
  // Scene 3: 4.0s - 5.5s (WE LOOK CLOSER.)
  // Scene 4: 5.5s - 7.5s (WE BUILD.)
  // Scene 5: 7.5s - 9.5s (WE DISCOVER.)
  // Scene 6: 9.5s - 11.5s (FOR A SUSTAINABLE EARTH. - Floating glass panel)
  // Scene 7: 11.5s - 13.5s (SLIET // 09-10 OCTOBER 2026)
  // Scene 8: 13.5s - 16.0s (TECHFEST'26 Final Reveal & Enter CTA)

  let scene = 1;
  let localT = 0;

  if (elapsedTime < 2.0) {
    scene = 1;
    localT = elapsedTime / 2.0;
  } else if (elapsedTime < 4.0) {
    scene = 2;
    localT = (elapsedTime - 2.0) / 2.0;
  } else if (elapsedTime < 5.5) {
    scene = 3;
    localT = (elapsedTime - 4.0) / 1.5;
  } else if (elapsedTime < 7.5) {
    scene = 4;
    localT = (elapsedTime - 5.5) / 2.0;
  } else if (elapsedTime < 9.5) {
    scene = 5;
    localT = (elapsedTime - 7.5) / 2.0;
  } else if (elapsedTime < 11.5) {
    scene = 6;
    localT = (elapsedTime - 9.5) / 2.0;
  } else if (elapsedTime < 13.5) {
    scene = 7;
    localT = (elapsedTime - 11.5) / 2.0;
  } else {
    scene = 8;
    localT = Math.min(1.0, (elapsedTime - 13.5) / 2.5);
  }

  // Smooth bell-curve opacity
  let opacity = 1.0;
  if (scene < 8) {
    if (localT < 0.2) opacity = localT / 0.2;
    else if (localT > 0.8) opacity = (1.0 - localT) / 0.2;
    else opacity = 1.0;
  } else {
    opacity = Math.min(1.0, localT / 0.3);
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between items-center pt-8 sm:pt-14 pb-6 sm:pb-12 px-6 sm:px-12 md:px-16 text-center text-white">
      {/* Top Quiet Minimal Scene Header */}
      <div className="pt-2">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase">
          {scene <= 3
            ? "THE LIVING PLANET"
            : scene <= 5
            ? "HUMAN EXPLORATION"
            : scene === 6
            ? "RESPONSIBILITY & BALANCE"
            : scene === 7
            ? "ORIGIN // SLIET"
            : "TECHFEST'26 // SLIET"}
        </span>
      </div>

      {/* Main Single Centered Story Stage */}
      <div
        className={`w-full max-w-3xl flex-1 flex flex-col pointer-events-none ${
          scene === 8
            ? "items-center justify-center"
            : "items-center justify-end pb-12 sm:justify-center sm:pb-0"
        }`}
      >
        {/* SCENE 01 — DARKNESS */}
        {scene === 1 && <div className="opacity-0 pointer-events-none" />}

        {/* SCENE 02 — OUR HOME / ONE PLANET */}
        {scene === 2 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              {localT < 0.5 ? "OUR HOME." : "ONE PLANET."}
            </h2>
          </div>
        )}

        {/* SCENE 03 — CURIOSITY */}
        {scene === 3 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE LOOK CLOSER.
            </h2>
          </div>
        )}

        {/* SCENE 04 — TECHNOLOGY */}
        {scene === 4 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE BUILD.
            </h2>
          </div>
        )}

        {/* SCENE 05 — SCIENCE */}
        {scene === 5 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE DISCOVER.
            </h2>
          </div>
        )}

        {/* SCENE 06 — SUSTAINABILITY (The Only Subtle Translucent Glass Panel) */}
        {scene === 6 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <div className="px-8 sm:px-12 py-6 sm:py-8 bg-black/30 backdrop-blur-md border border-white/15 rounded-sm max-w-lg shadow-2xl">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-emerald-400 uppercase block pb-1">
                // BALANCE
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-snug">
                FOR A SUSTAINABLE EARTH.
              </h2>
            </div>
          </div>
        )}

        {/* SCENE 07 — SLIET REVEAL */}
        {scene === 7 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // DESTINATION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              SLIET
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-[0.4em] uppercase pt-1">
              09—10 OCTOBER 2026
            </p>
          </div>
        )}

        {/* SCENE 08 — FINAL TECHFEST'26 REVEAL & ENTER CTA */}
        {scene === 8 && (
          <div
            className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 transition-opacity duration-200 pointer-events-auto max-w-lg mx-auto"
            style={{ opacity }}
          >
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
                NATIONAL TECHNICAL FESTIVAL
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                {FEST_DATA.shortTitle}
              </h1>
              <p className="text-[10px] sm:text-xs font-light text-neutral-300 tracking-[0.2em] font-sans uppercase max-w-xs sm:max-w-md mx-auto pt-1">
                TECHNOLOGY AND SCIENCES FOR SUSTAINABLE EARTH
              </p>
              <p className="text-[9px] sm:text-[11px] font-mono text-neutral-500 tracking-[0.3em] uppercase pt-1">
                09—10 OCTOBER 2026 // SLIET
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <MagneticButton dataCursor="ENTER">
                <button
                  onClick={onEnter}
                  className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-mono text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                  aria-label="Enter the Techfest experience"
                >
                  <span>ENTER THE EXPERIENCE</span>
                  <span>→</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="pb-1 sm:pb-2 flex flex-col items-center gap-1 text-[8px] sm:text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
        <span>SLIET 30.22°N 75.83°E // ALT: 410KM</span>
      </div>
    </div>
  );
}
