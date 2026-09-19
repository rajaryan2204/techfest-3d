"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

interface HeroSectionProps {
  progress: number;
}

export default function HeroSection({ progress }: HeroSectionProps) {
  // If user has scrolled past the intro story, hide the hero
  if (progress > 0.15) return null;

  // Compute opacity for each of the 8 story scenes within [0.0, 0.14]
  const getSceneOpacity = (start: number, end: number) => {
    if (progress < start || progress > end) return 0;
    const mid = (start + end) / 2;
    const half = (end - start) / 2;
    const dist = Math.abs(progress - mid);
    return Math.max(0, 1 - (dist / half) * 1.5);
  };

  const s1 = getSceneOpacity(0.00, 0.022); // Scene 01: OUR HOME.
  const s2 = getSceneOpacity(0.018, 0.040); // Scene 02: ONE PLANET. ONE SHARED FUTURE.
  const s3 = getSceneOpacity(0.036, 0.058); // Scene 03: THE WORLD IS CHANGING. SO MUST WE.
  const s4 = getSceneOpacity(0.054, 0.076); // Scene 04: IDEAS BECOME TECHNOLOGY.
  const s5 = getSceneOpacity(0.072, 0.094); // Scene 05: WE BUILD. WE CREATE. WE INNOVATE.
  const s6 = getSceneOpacity(0.090, 0.112); // Scene 06: PROGRESS SHOULD MOVE THE WORLD FORWARD. SUSTAINABLY.
  const s7 = getSceneOpacity(0.108, 0.145); // Scene 07 & 08: TECHFEST'26 + ENTER TECHFEST

  const handleEnterTechfest = () => {
    const docFlow = document.getElementById("document-flow");
    const trackHeight = docFlow ? docFlow.offsetTop - window.innerHeight : 600 * (window.innerHeight / 100);
    window.scrollTo({
      top: trackHeight * 0.21,
      behavior: "smooth",
    });
  };

  return (
    <section className="fixed inset-0 pointer-events-none select-none z-20 flex flex-col justify-between items-center py-10 sm:py-14 px-6 sm:px-12 md:px-16 text-center text-white">
      {/* Top Fixed Brand Tracker */}
      <div className="pt-2 sm:pt-4">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-neutral-400 uppercase">
          {FEST_DATA.shortTitle} // DIGITAL EXHIBITION
        </span>
      </div>

      {/* Center Cinematic Story Overlay */}
      <div className="relative w-full max-w-2xl flex-1 flex items-center justify-center pointer-events-none">
        {/* Scene 01: OUR HOME. */}
        {s1 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s1 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              SCENE 01 // ORIGIN
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-widest text-white uppercase font-sans">
              OUR HOME.
            </h2>
            <p className="text-xs font-mono text-neutral-400 tracking-[0.25em] uppercase">
              A floating oasis in deep space
            </p>
          </div>
        )}

        {/* Scene 02: ONE PLANET. ONE SHARED FUTURE. */}
        {s2 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s2 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              SCENE 02 // UNITY
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-white uppercase font-sans leading-tight">
              ONE PLANET. <br />
              <span className="text-neutral-300 font-light">ONE SHARED FUTURE.</span>
            </h2>
          </div>
        )}

        {/* Scene 03: THE WORLD IS CHANGING. SO MUST WE. */}
        {s3 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s3 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              SCENE 03 // EVOLUTION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-white uppercase font-sans leading-tight">
              THE WORLD IS CHANGING. <br />
              <span className="text-neutral-300 font-light">SO MUST WE.</span>
            </h2>
          </div>
        )}

        {/* Scene 04: IDEAS BECOME TECHNOLOGY. */}
        {s4 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s4 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              SCENE 04 // SPARK
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-white uppercase font-sans leading-tight">
              IDEAS BECOME <br />
              <span className="text-cyan-300 font-light">TECHNOLOGY.</span>
            </h2>
          </div>
        )}

        {/* Scene 05: WE BUILD. WE CREATE. WE INNOVATE. */}
        {s5 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s5 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              SCENE 05 // ACTION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-widest text-white uppercase font-sans leading-snug">
              WE BUILD. <br />
              WE CREATE. <br />
              <span className="text-neutral-300 font-light">WE INNOVATE.</span>
            </h2>
          </div>
        )}

        {/* Scene 06: PROGRESS SHOULD MOVE THE WORLD FORWARD. SUSTAINABLY. */}
        {s6 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-200"
            style={{ opacity: s6 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-emerald-400 uppercase">
              SCENE 06 // RESPONSIBILITY
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extralight tracking-wider text-white uppercase font-sans leading-relaxed">
              PROGRESS SHOULD MOVE <br />
              THE WORLD FORWARD. <br />
              <span className="text-emerald-400 font-medium">SUSTAINABLY.</span>
            </h2>
          </div>
        )}

        {/* Scene 07 & 08: TECHFEST'26 Main Brand & Enter CTA */}
        {s7 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-5 transition-opacity duration-200 pointer-events-auto"
            style={{ opacity: s7 }}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase">
                NATIONAL TECHNICAL FESTIVAL
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase font-sans">
                {FEST_DATA.shortTitle}
              </h1>
              <p className="text-xs sm:text-sm font-light text-neutral-300 tracking-wide font-sans max-w-md mx-auto">
                Technology and Sciences for Sustainable Earth
              </p>
              <p className="text-[11px] font-mono text-neutral-400 tracking-[0.3em] uppercase pt-1">
                09—10 OCTOBER 2026 // SLIET
              </p>
            </div>

            {/* Scene 08: ENTER TECHFEST → CTA */}
            <div className="pt-3">
              <MagneticButton dataCursor="ENTER">
                <button
                  onClick={handleEnterTechfest}
                  className="px-8 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl flex items-center gap-2"
                >
                  <span>ENTER TECHFEST</span>
                  <span>→</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scroll Guide */}
      <div className="pb-4 flex flex-col items-center gap-1 text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
        <span>SCROLL TO EXPLORE THE STORY</span>
        <div className="w-px h-5 bg-gradient-to-b from-neutral-400 via-neutral-600 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
