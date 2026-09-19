"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

interface CinematicTypographyProps {
  progress: number;
  onEnter: () => void;
}

export default function CinematicTypography({ progress, onEnter }: CinematicTypographyProps) {
  // Discrete Scene Selection (0 to 4) - Strictly one scene rendered at a time
  let sceneIndex = 0;
  let localProgress = 0;

  if (progress < 0.20) {
    sceneIndex = 0;
    localProgress = progress / 0.20;
  } else if (progress < 0.40) {
    sceneIndex = 1;
    localProgress = (progress - 0.20) / 0.20;
  } else if (progress < 0.60) {
    sceneIndex = 2;
    localProgress = (progress - 0.40) / 0.20;
  } else if (progress < 0.80) {
    sceneIndex = 3;
    localProgress = (progress - 0.60) / 0.20;
  } else {
    sceneIndex = 4;
    localProgress = (progress - 0.80) / 0.20;
  }

  // Smooth bell curve opacity for current scene
  let opacity = 1.0;
  if (sceneIndex < 4) {
    if (localProgress < 0.2) opacity = localProgress / 0.2;
    else if (localProgress > 0.8) opacity = (1.0 - localProgress) / 0.2;
    else opacity = 1.0;
  } else {
    opacity = Math.min(1.0, localProgress / 0.25);
  }

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-20 flex flex-col justify-between items-center py-12 sm:py-16 px-6 sm:px-12 md:px-16 text-center text-white">
      {/* Top Tag */}
      <div className="pt-2">
        <span className="text-[10px] font-mono tracking-[0.4em] text-neutral-400 uppercase">
          {sceneIndex <= 1
            ? "PROLOGUE // THE PLANET"
            : sceneIndex <= 3
            ? "PROLOGUE // THE INNOVATION"
            : "SLIET // TECHFEST'26"}
        </span>
      </div>

      {/* Main Single Centered Story Stage */}
      <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
        {/* SCENE 0: OUR HOME */}
        {sceneIndex === 0 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-300"
            style={{ opacity }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              OUR HOME.
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-400 tracking-[0.3em] uppercase pt-2 font-mono">
              ONE PLANET. ONE SHARED DESTINY.
            </p>
          </div>
        )}

        {/* SCENE 1: THE PULSE OF INNOVATION */}
        {sceneIndex === 1 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-300"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // EVOLUTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-tight">
              FROM IDEAS <br />
              <span className="text-cyan-300 font-light">TO TECHNOLOGY.</span>
            </h2>
          </div>
        )}

        {/* SCENE 2: THE PIONEERS */}
        {sceneIndex === 2 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-300"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // THE PIONEERS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE BUILD.
            </h2>
            <p className="text-sm sm:text-2xl font-light text-neutral-300 tracking-[0.3em] uppercase font-sans pt-1">
              WE CREATE. WE INNOVATE.
            </p>
          </div>
        )}

        {/* SCENE 3: SUSTAINABILITY */}
        {sceneIndex === 3 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-300"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-snug">
              TECHNOLOGY FOR <br />
              <span className="text-emerald-400 font-light">SUSTAINABLE EARTH.</span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-400 tracking-[0.25em] uppercase font-mono pt-1">
              ENGINEERING FOR A BALANCED PLANET
            </p>
          </div>
        )}

        {/* SCENE 4: THE GRAND REVEAL & ENTER BUTTON */}
        {sceneIndex === 4 && (
          <div
            className="flex flex-col items-center justify-center space-y-6 transition-opacity duration-300 pointer-events-auto animate-in fade-in zoom-in-95 duration-500"
            style={{ opacity }}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
                NATIONAL TECHNICAL FESTIVAL
              </span>
              <h1 className="text-4xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
                {FEST_DATA.shortTitle}
              </h1>
              <p className="text-xs sm:text-sm font-light text-neutral-300 tracking-widest font-sans uppercase max-w-md mx-auto pt-2">
                Technology and Sciences for Sustainable Earth
              </p>
              <p className="text-[11px] font-mono text-neutral-500 tracking-[0.3em] uppercase pt-1">
                09—10 OCTOBER 2026 // SLIET
              </p>
            </div>

            <div className="pt-3">
              <MagneticButton dataCursor="ENTER">
                <button
                  onClick={onEnter}
                  className="px-10 py-4 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
                  aria-label="Enter Techfest Exhibition"
                >
                  <span>ENTER TECHFEST</span>
                  <span>→</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Indicator */}
      <div className="pb-2 flex flex-col items-center gap-1 text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
        <span>{sceneIndex < 4 ? "STORY EXPERIENCE IN PROGRESS" : "CLICK ENTER TO START EXHIBITION"}</span>
        <div className="w-px h-4 bg-gradient-to-b from-cyan-400 via-neutral-600 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
