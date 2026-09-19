"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

interface WelcomeTypographyProps {
  progress: number;
  onEnter: () => void;
}

export default function WelcomeTypography({ progress, onEnter }: WelcomeTypographyProps) {
  // Discrete Scene Intervals (00 to 10)
  let scene = 0;
  let localProgress = 0;

  if (progress < 0.08) {
    scene = 0; // 00 BLACK
    localProgress = progress / 0.08;
  } else if (progress < 0.18) {
    scene = 1; // 01 EARTH
    localProgress = (progress - 0.08) / 0.10;
  } else if (progress < 0.28) {
    scene = 2; // 02 OBSERVE
    localProgress = (progress - 0.18) / 0.10;
  } else if (progress < 0.38) {
    scene = 3; // 03 QUESTION
    localProgress = (progress - 0.28) / 0.10;
  } else if (progress < 0.48) {
    scene = 4; // 04 CREATE
    localProgress = (progress - 0.38) / 0.10;
  } else if (progress < 0.58) {
    scene = 5; // 05 CONNECT
    localProgress = (progress - 0.48) / 0.10;
  } else if (progress < 0.68) {
    scene = 6; // 06 INNOVATE
    localProgress = (progress - 0.58) / 0.10;
  } else if (progress < 0.78) {
    scene = 7; // 07 SUSTAIN
    localProgress = (progress - 0.68) / 0.10;
  } else if (progress < 0.88) {
    scene = 8; // 08 SLIET
    localProgress = (progress - 0.78) / 0.10;
  } else if (progress < 0.96) {
    scene = 9; // 09 TECHFEST REVEAL
    localProgress = (progress - 0.88) / 0.08;
  } else {
    scene = 10; // 10 ENTER
    localProgress = (progress - 0.96) / 0.04;
  }

  // Smooth bell-curve opacity within each discrete scene
  let opacity = 1.0;
  if (scene < 9) {
    if (localProgress < 0.2) opacity = localProgress / 0.2;
    else if (localProgress > 0.8) opacity = (1.0 - localProgress) / 0.2;
    else opacity = 1.0;
  } else {
    opacity = Math.min(1.0, localProgress / 0.25);
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between items-center py-10 sm:py-14 px-6 sm:px-12 md:px-16 text-center text-white">
      {/* Top Header Tracker */}
      <div className="pt-2">
        <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase">
          {scene <= 3
            ? "PROLOGUE // OBSERVATION"
            : scene <= 6
            ? "PROLOGUE // TECHNOLOGY"
            : scene === 7
            ? "PROLOGUE // SUSTAINABILITY"
            : scene === 8
            ? "PROLOGUE // SLIET"
            : "TECHFEST'26 // SLIET"}
        </span>
      </div>

      {/* Main Single Centered Story Stage (Strictly ONE scene mounted at a time) */}
      <div className="w-full max-w-3xl flex-1 flex items-center justify-center pointer-events-none">
        {/* ========================================================================= */}
        {/* SCENE 00 — BLACK                                                          */}
        {/* ========================================================================= */}
        {scene === 0 && (
          <div
            className="flex flex-col items-center justify-center space-y-2 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[11px] font-mono tracking-[0.4em] text-neutral-400 uppercase">
              09—10 OCTOBER 2026
            </span>
            <span className="text-xs font-mono tracking-[0.5em] text-white uppercase font-light">
              SLIET
            </span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 01 — EARTH                                                          */}
        {/* ========================================================================= */}
        {scene === 1 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-tight">
              THIS IS WHERE <br />
              <span className="text-neutral-300">IT BEGINS.</span>
            </h2>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 02 — OBSERVE                                                        */}
        {/* ========================================================================= */}
        {scene === 2 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // OBSERVATION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE OBSERVE.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-[0.3em] uppercase pt-1">
              WE LOOK CLOSER.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 03 — QUESTION                                                       */}
        {/* ========================================================================= */}
        {scene === 3 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-snug">
              WE QUESTION <br />
              <span className="text-neutral-400 font-light">WHAT EXISTS.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-[0.25em] uppercase pt-2">
              WHAT COULD EXIST?
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 04 — CREATE                                                         */}
        {/* ========================================================================= */}
        {scene === 4 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // CREATION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-snug">
              WE TURN QUESTIONS <br />
              <span className="text-neutral-300 font-light">INTO IDEAS.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-[0.25em] uppercase pt-1">
              IDEAS INTO TECHNOLOGY.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 05 — CONNECT                                                        */}
        {/* ========================================================================= */}
        {scene === 5 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              IDEAS CONNECT.
            </h2>
            <p className="text-sm sm:text-base font-light text-neutral-300 tracking-[0.3em] uppercase font-sans pt-1">
              SYSTEMS EMERGE.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 06 — INNOVATE                                                       */}
        {/* ========================================================================= */}
        {scene === 6 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // PROGRESS
            </span>
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-none">
              WE BUILD.
            </h2>
            <p className="text-sm sm:text-2xl font-light text-cyan-300 tracking-[0.3em] uppercase font-sans pt-1">
              WE INNOVATE.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 07 — SUSTAIN                                                        */}
        {/* ========================================================================= */}
        {scene === 7 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white uppercase font-sans leading-snug">
              PROGRESS HAS <br />
              <span className="text-neutral-400 font-light">A RESPONSIBILITY.</span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-300 tracking-[0.2em] uppercase max-w-md pt-1">
              TO THE PLANET THAT STARTED IT ALL.
            </p>
            <p className="text-sm sm:text-lg font-mono text-emerald-400 tracking-[0.3em] uppercase pt-2">
              TO SUSTAIN.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 08 — EARTH -> SLIET                                                 */}
        {/* ========================================================================= */}
        {scene === 8 && (
          <div
            className="flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              // DESTINATION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase font-sans leading-snug">
              AND HERE, <br />
              <span className="text-neutral-300 font-light">WE BUILD.</span>
            </h2>
            <p className="text-xs sm:text-base font-mono text-white tracking-[0.4em] uppercase pt-2">
              SLIET LONGOWAL, PUNJAB
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 09 & 10 — TECHFEST REVEAL & ENTER                                    */}
        {/* ========================================================================= */}
        {(scene === 9 || scene === 10) && (
          <div
            className="flex flex-col items-center justify-center space-y-6 transition-opacity duration-200 pointer-events-auto"
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
                TECHNOLOGY AND SCIENCES FOR SUSTAINABLE EARTH
              </p>
              <p className="text-[11px] font-mono text-neutral-500 tracking-[0.3em] uppercase pt-1">
                09—10 OCTOBER 2026 // SLIET
              </p>
            </div>

            <div className="pt-3">
              <MagneticButton dataCursor="ENTER">
                <button
                  onClick={onEnter}
                  className="px-9 py-4 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
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

      {/* Bottom Minimal Scroll Indicator */}
      <div className="pb-2 flex flex-col items-center gap-1 text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
        <span>{scene < 9 ? "SCROLL TO EXPLORE THE STORY" : "SCROLL OR CLICK TO ENTER ↓"}</span>
        <div className="w-px h-4 bg-gradient-to-b from-cyan-400 via-neutral-600 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
